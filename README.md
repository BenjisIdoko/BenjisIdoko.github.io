# benjisidoko.github.io

Portfolio of Benjamin Emmanuel, product designer and design engineer.

Plain HTML, CSS, and JavaScript. No framework, no build step, no runtime dependencies.
The only external requests are Google Fonts.

## Structure

```
index.html            Home
unitora.html          Unitora case study
cng-connect.html      CNG-Connect case study
site.js               Page interactions: menu, work filters, key decisions, toolkit cards, copy email
site-fx.js            Effects: live clock, image wipe-ins, inspect mode (press I), image lightbox
assets/               Images (WebP)
cv.pdf                Linked from "Download CV"
sitemap.xml, robots.txt
```

## Adding screenshots to the case studies

Placeholders look like `<div class="slot" ...><span>Investor dashboard: portfolio overview</span></div>`.
Replace each one with an image:

```html
<img src="./assets/unitora/dashboard.webp" alt="Investor dashboard: portfolio overview"
     style="display:block;width:100%;height:auto;border-radius:12px">
```

## Before adding Tracify back

Its screenshots show client branding and real names. Get the client's approval or anonymise them first.

## Deploy (GitHub Pages)

Put these files at the root of the `BenjisIdoko.github.io` repository and publish from the branch root.
