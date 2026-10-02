// Run with `node scripts/optimize-images.mjs` before publishing; requires macOS sips.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoots = ['.', 'publish'].map((folder) => path.join(projectRoot, folder));
const imageTagPattern = /<img\b[^>]*>/gi;
const dimensionsPattern = /pixelWidth:\s*(\d+)[\s\S]*pixelHeight:\s*(\d+)/;
const widthsToGenerate = [480, 960, 1440];

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'));
  return match ? match[1] : null;
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`(\\s${name}=")[^"]*(")`, 'i');
  if (pattern.test(tag)) return tag.replace(pattern, `$1${value}$2`);
  return tag.replace(/\s*\/?\s*>$/, (ending) => ` ${name}="${value}"${ending}`);
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => path.join(directory, entry.name));
}

function pageSizes(file, source, tag) {
  const style = readAttribute(tag, 'style') || '';
  if (/portrait\./i.test(source)) return '(max-width: 760px) 72vw, 320px';
  if (/(?:cngm|unim)\./i.test(source)) return '(max-width: 760px) 22vw, 120px';
  if (/height:clamp\(220px,26vw,320px\)/.test(style)) {
    return '(max-width: 760px) 82vw, 36vw';
  }
  if (/Case Study\.dc\.html$|(?:^|\/)cng-connect\.html$|(?:^|\/)unitora\.html$/i.test(file)) {
    return '(max-width: 760px) 92vw, 90vw';
  }
  return '(max-width: 760px) 92vw, 48vw';
}

function encodePath(value) {
  return value.split('/').map(encodeURIComponent).join('/');
}

function optimizeSource(sourcePath) {
  const sourceFile = path.join(projectRoot, sourcePath);
  const info = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', sourceFile], {
    encoding: 'utf8'
  });
  const dimensions = info.match(dimensionsPattern);
  if (!dimensions) throw new Error(`Could not read image dimensions: ${sourcePath}`);

  const sourceWidth = Number(dimensions[1]);
  const sourceHeight = Number(dimensions[2]);
  const widths = [...new Set([
    ...widthsToGenerate.filter((width) => width < sourceWidth),
    Math.min(sourceWidth, 1440)
  ])].sort((left, right) => left - right);
  const imageStem = path.posix.basename(sourcePath).replace(/\.[^.]+$/, '');
  const imageDirectory = path.posix.dirname(sourcePath).replace(/^assets\/?/, '');
  const outputDirectory = path.join(projectRoot, 'assets', 'optimized', imageDirectory);

  mkdirSync(outputDirectory, { recursive: true });
  for (const width of widths) {
    const baseName = `${imageStem}-${width}`;
    for (const [format, quality] of [['avif', '65'], ['jpeg', '80']]) {
      const outputFile = path.join(outputDirectory, `${baseName}.${format === 'jpeg' ? 'jpg' : format}`);
      const args = ['-s', 'format', format, '-s', 'formatOptions', quality];
      if (width < sourceWidth) args.push('--resampleWidth', String(width));
      args.push(sourceFile, '--out', outputFile);
      execFileSync('sips', args, { stdio: 'ignore' });
    }
  }

  const outputBase = path.posix.join('assets', 'optimized', imageDirectory, imageStem);
  const avifSet = widths.map((width) => `${encodePath(`${outputBase}-${width}.avif`)} ${width}w`).join(', ');
  const jpegSet = widths.map((width) => `${encodePath(`${outputBase}-${width}.jpg`)} ${width}w`).join(', ');
  const largestWidth = widths[widths.length - 1];
  const fallback = encodePath(`${outputBase}-${largestWidth}.jpg`);

  for (const publicRoot of publicRoots) {
    const outputDirectory = path.join(publicRoot, 'assets', 'optimized', imageDirectory);
    mkdirSync(outputDirectory, { recursive: true });
    for (const width of widths) {
      for (const extension of ['avif', 'jpg']) {
        const fileName = `${imageStem}-${width}.${extension}`;
        const generatedFile = path.join(projectRoot, 'assets', 'optimized', imageDirectory, fileName);
        const publicFile = path.join(outputDirectory, fileName);
        if (generatedFile !== publicFile) {
          execFileSync('cp', [generatedFile, publicFile]);
        }
      }
    }
  }

  return {
    sourcePath,
    sourceWidth,
    sourceHeight,
    avifSet,
    jpegSet,
    fallback
  };
}

const files = publicRoots.flatMap(htmlFiles);
const sourcePaths = new Set();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(imageTagPattern)) {
    const source = readAttribute(match[0], 'data-original-src') || readAttribute(match[0], 'src');
    if (source && /^assets\/.+\.(?:png|jpe?g)$/i.test(source)) sourcePaths.add(source);
  }
}

const optimized = new Map();
for (const source of sourcePaths) optimized.set(source, optimizeSource(source));

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const updated = html.replace(imageTagPattern, (tag) => {
    const source = readAttribute(tag, 'data-original-src') || readAttribute(tag, 'src');
    const image = source && optimized.get(source);
    if (!image || readAttribute(tag, 'data-optimized-image')) return tag;

    const sizes = pageSizes(file, source, tag);
    let img = setAttribute(tag, 'src', image.fallback);
    img = setAttribute(img, 'srcset', image.jpegSet);
    img = setAttribute(img, 'sizes', sizes);
    img = setAttribute(img, 'width', String(image.sourceWidth));
    img = setAttribute(img, 'height', String(image.sourceHeight));
    img = setAttribute(img, 'decoding', 'async');
    img = setAttribute(img, 'data-original-src', source);
    img = setAttribute(img, 'data-optimized-image', 'true');

    return `<picture><source type="image/avif" srcset="${image.avifSet}" sizes="${sizes}">${img}</picture>`;
  });
  if (updated !== html) writeFileSync(file, updated);
}

console.log(`Optimized ${optimized.size} source images across ${files.length} HTML pages.`);