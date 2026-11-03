(() => {
  if (window.__bieFx) return; window.__bieFx = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ACC = '#2B4AA0', MONO = "'Spline Sans Mono',ui-monospace,monospace";

  // ---------- clock + pulse ----------
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' });
  const tick = () => document.querySelectorAll('[data-clock]').forEach(el => { el.textContent = fmt.format(new Date()) + ' WAT'; });
  setInterval(tick, 1000);
  addEventListener('load', tick);
  const pulse = el => { if (el.__p || reduced) return; el.__p = 1; el.animate([{ boxShadow: '0 0 0 0 rgba(46,158,99,.55)' }, { boxShadow: '0 0 0 7px rgba(46,158,99,0)' }], { duration: 1800, iterations: Infinity, easing: 'ease-out' }); };

  // ---------- wipe-in ----------
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, r = getComputedStyle(el).borderRadius || '0';
    el.style.clipPath = `inset(0 0 0 0 round ${r})`;
    const kids = el.querySelectorAll('img,image-slot');
    kids.forEach(k => k.animate([{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 1300, easing: 'cubic-bezier(.2,.7,.2,1)' }));
    setTimeout(() => { el.style.clipPath = ''; }, 1150);
  }), { rootMargin: '0px 0px -12% 0px' });
  const prepWipe = el => {
    if (el.__w) return; el.__w = 1; if (reduced) return;
    const r = getComputedStyle(el).borderRadius || '0';
    el.style.clipPath = `inset(100% 0 0 0 round ${r})`;
    el.style.transition = [el.style.transition, 'clip-path 1.1s cubic-bezier(.75,0,.2,1)'].filter(Boolean).join(',');
    requestAnimationFrame(() => io.observe(el));
  };

  let scanQ = false;
  const scan = () => { scanQ = false; document.querySelectorAll('[data-wipe]').forEach(prepWipe); document.querySelectorAll('[data-pulse]').forEach(pulse); tick(); syncBtns(); };
  const queue = () => { if (!scanQ) { scanQ = true; requestAnimationFrame(scan); } };
  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true });

  // ---------- inspect mode ----------
  let on = false, root, box, pads, label, target;
  const hex = c => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); if (p.length > 3 && p[3] === 0) return null; return '#' + p.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase(); };
  const div = (css, parent) => { const d = document.createElement('div'); d.style.cssText = css; (parent || root).appendChild(d); return d; };
  const tokens = [['Ink', '#16171A'], ['Paper', '#F4F2EC'], ['Signal', '#2B4AA0'], ['Muted', '#5F6166'], ['Line', '#DDD8CD'], ['Live', '#2E9E63']];

  function build() {
    root = div('position:fixed;inset:0;z-index:9999;pointer-events:none;font:11px/1.35 ' + MONO, document.body);
    const g = div('position:absolute;inset:0;max-width:1240px;margin:0 auto;padding:0 clamp(20px,4vw,48px);box-sizing:border-box;display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(12px,2vw,24px)');
    for (let i = 0; i < 12; i++) div('background:rgba(43,74,160,.045);border-left:1px solid rgba(43,74,160,.12);border-right:1px solid rgba(43,74,160,.12)', g);
    box = div('position:absolute;outline:1px solid ' + ACC + ';display:none');
    pads = [0, 1, 2, 3].map(() => div('position:absolute;background:repeating-linear-gradient(45deg,rgba(46,158,99,.28) 0 2px,rgba(46,158,99,.1) 2px 6px);display:none'));
    label = div('position:absolute;display:none;background:#16171A;color:#F4F2EC;padding:6px 8px;border-radius:6px;white-space:nowrap;box-shadow:0 8px 20px -8px rgba(0,0,0,.5)');
    const panel = div('position:fixed;left:16px;bottom:16px;pointer-events:auto;background:#16171A;color:#F4F2EC;border-radius:14px;padding:14px 16px;width:236px;box-shadow:0 20px 40px -20px rgba(0,0,0,.6)');
    panel.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b style="font-weight:500;color:#8FA6E8;letter-spacing:.06em;text-transform:uppercase">Inspect mode</b><button data-inspect-toggle style="all:unset;cursor:pointer;color:#B4B3AE;padding:2px 4px">Esc ✕</button></div>`
      + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin-bottom:12px">${tokens.map(([n, c]) => `<div style="display:flex;gap:7px;align-items:center"><span style="width:14px;height:14px;border-radius:4px;background:${c};box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)"></span><span>${n}<br><span style="color:#8E8D88">${c}</span></span></div>`).join('')}</div>`
      + `<div style="border-top:1px solid #2E2F33;padding-top:10px;display:grid;gap:4px;color:#D6D5CF"><span>Display · Familjen Grotesk 600</span><span>Body · Hanken Grotesk 400/500</span><span>Label · Spline Sans Mono 400</span><span style="color:#8E8D88;margin-top:6px">12 col · gutter 24 · max 1240</span><span style="color:#8E8D88">Hover anything to measure it.</span></div>`;
  }
  function draw() {
    if (!on || !target || !target.isConnected) { if (box) { box.style.display = 'none'; label.style.display = 'none'; pads.forEach(p => p.style.display = 'none'); } return; }
    const r = target.getBoundingClientRect(), cs = getComputedStyle(target);
    Object.assign(box.style, { display: 'block', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    const [pt, pr, pb, pl] = ['Top', 'Right', 'Bottom', 'Left'].map(s => parseFloat(cs['padding' + s]) || 0);
    [[r.left, r.top, r.width, pt], [r.right - pr, r.top + pt, pr, r.height - pt - pb], [r.left, r.bottom - pb, r.width, pb], [r.left, r.top + pt, pl, r.height - pt - pb]]
      .forEach(([x, y, w, h], i) => Object.assign(pads[i].style, { display: w > 0 && h > 0 ? 'block' : 'none', left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }));
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '');
    const lh = cs.lineHeight === 'normal' ? 'auto' : Math.round(parseFloat(cs.lineHeight));
    const tag = target.tagName.toLowerCase();
    const bg = hex(cs.backgroundColor), fg = hex(cs.color);
    const pad = [pt, pr, pb, pl].some(Boolean) ? `pad ${[pt, pr, pb, pl].map(Math.round).join(' ')}` : '';
    const gap = cs.display.includes('flex') || cs.display.includes('grid') ? (cs.gap && cs.gap !== 'normal' ? `gap ${cs.gap.split(' ').map(v => Math.round(parseFloat(v))).join('/')}` : '') : '';
    label.innerHTML = `<span style="color:#8FA6E8">${tag}</span> · ${Math.round(r.width)}×${Math.round(r.height)}${pad ? ' · ' + pad : ''}${gap ? ' · ' + gap : ''}<br>`
      + `<span style="color:#B4B3AE">${fam} ${Math.round(parseFloat(cs.fontSize))}/${lh} · ${cs.fontWeight}</span>`
      + (fg ? ` <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${fg};vertical-align:middle"></span> ${fg}` : '')
      + (bg ? ` <span style="color:#8E8D88">bg</span> <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${bg};vertical-align:middle;box-shadow:0 0 0 1px #45464B"></span> ${bg}` : '');
    label.style.display = 'block';
    const lw = label.offsetWidth, lhgt = label.offsetHeight;
    let ly = r.top - lhgt - 6; if (ly < 70) ly = Math.min(r.bottom + 6, innerHeight - lhgt - 8);
    label.style.left = Math.max(8, Math.min(r.left, innerWidth - lw - 8)) + 'px';
    label.style.top = ly + 'px';
  }
  const move = e => { if (!on) return; if (root && root.contains(e.target)) return; target = e.target; requestAnimationFrame(draw); };
  function syncBtns() {
    document.querySelectorAll('[data-inspect-toggle]').forEach(b => {
      if (root && root.contains(b)) return;
      b.setAttribute('aria-pressed', on);
      b.style.background = on ? ACC : ''; b.style.color = on ? '#fff' : ''; b.style.borderColor = on ? ACC : '';
    });
  }
  function toggle(force) {
    on = typeof force === 'boolean' ? force : !on;
    if (on && !root) build();
    if (root) root.style.display = on ? 'block' : 'none';
    document.documentElement.style.cursor = on ? 'crosshair' : '';
    target = null; draw(); syncBtns();
  }
  window.bieInspect = { toggle };
  if (!document.documentElement.lang) document.documentElement.lang = 'en';
  document.addEventListener('mousemove', move, true);
  addEventListener('scroll', () => on && requestAnimationFrame(draw), { passive: true });
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-inspect-toggle]'); if (b) { e.preventDefault(); toggle(); } }, true);
  document.addEventListener('keydown', e => {
    const t = e.target, typing = t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName));
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'i' || e.key === 'I') toggle();
    else if (e.key === 'Escape' && on) toggle(false);
  });
  queue();
})();

;(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let box, i = 0, items = [], last;
  const img = () => box.querySelector('img'), cap = () => box.querySelector('[data-c]'), ctr = () => box.querySelector('[data-n]');
  const show = k => { i = (k + items.length) % items.length; const it = items[i]; img().src = it.src; img().alt = it.alt; cap().textContent = it.cap; ctr().textContent = (i + 1) + ' / ' + items.length; };
  const close = () => { if (!box) return; box.remove(); box = null; document.documentElement.style.overflow = ''; last && last.focus && last.focus(); };
  const b = (t, l, s) => '<button data-a="' + t + '" aria-label="' + l + '" style="all:unset;box-sizing:border-box;cursor:pointer;width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;display:grid;place-items:center;font:500 20px Hanken Grotesk,sans-serif;' + s + '">' + (t === 'x' ? '\u2715' : t === 'p' ? '\u2190' : '\u2192') + '</button>';
  const open = (g, k) => {
    items = [...g.querySelectorAll('img[data-lb]')].map(im => ({ src: im.currentSrc || im.src, alt: im.alt, cap: (fc => fc ? fc.querySelector('span').textContent + ' \u2014 ' + fc.lastChild.textContent : '')(im.parentNode.querySelector('figcaption')) }));
    last = document.activeElement;
    box = document.createElement('div'); box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Image viewer');
    box.style.cssText = 'position:fixed;inset:0;z-index:100;background:rgba(14,15,18,.94);display:flex;flex-direction:column;font-family:Hanken Grotesk,sans-serif;color:#F4F2EC;' + (reduced ? '' : 'animation:lbIn .2s ease');
    box.innerHTML = '<style>@keyframes lbIn{from{opacity:0}to{opacity:1}}</style><div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px"><span data-n style="font:12px Spline Sans Mono,monospace;letter-spacing:.04em"></span>' + b('x', 'Close', '') + '</div><div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:12px;padding:0 12px">' + b('p', 'Previous', 'flex:none') + '<img style="max-width:100%;max-height:100%;min-width:0;object-fit:contain;border-radius:10px;background:#fff"/>' + b('n', 'Next', 'flex:none') + '</div><div data-c style="padding:16px 20px 24px;text-align:center;font-size:15px;min-height:24px"></div>';
    document.body.appendChild(box); document.documentElement.style.overflow = 'hidden'; show(k);
    box.querySelector('[data-a=x]').focus();
  };
  document.addEventListener('click', e => {
    if (box) { const a = e.target.closest('[data-a]'); if (a) { const t = a.dataset.a; t === 'x' ? close() : show(i + (t === 'n' ? 1 : -1)); } else if (e.target === box || e.target.parentNode === box.children[1]) close(); return; }
    const t = e.target.closest && e.target.closest('img[data-lb],[data-lb-open]'); if (!t) return;
    const g = t.closest('[data-gallery]'); if (!g) return;
    open(g, t.matches('img') ? [...g.querySelectorAll('img[data-lb]')].indexOf(t) : 0);
  });
  document.addEventListener('keydown', e => {
    if (box) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(i + 1); else if (e.key === 'ArrowLeft') show(i - 1); else if (e.key === 'Tab') { const f = [...box.querySelectorAll('button')], k = f.indexOf(document.activeElement); e.preventDefault(); f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); } return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('img[data-lb]')) { e.preventDefault(); e.target.click(); }
  });
})();

;(() => {
  if (window.__bieMotion) return; window.__bieMotion = true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EASE = 'cubic-bezier(.2,.75,.2,1)', ACC = '#2B4AA0';

  // scroll progress
  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = 'position:fixed;left:0;top:0;height:3px;width:100%;background:' + ACC + ';transform-origin:0 50%;transform:scaleX(0);z-index:40;pointer-events:none';
  const mountBar = () => document.body && !bar.isConnected && document.body.appendChild(bar);

  // reveal
  const seen = new WeakSet(), anims = new WeakMap();
  const groups = [
    ['#main > section:first-child > div > div > :not(h1)', 'up'],
    ['#main > section:first-child > div > figure', 'portrait'],
    ['[data-count]', 'up', el => el.parentElement],
    ['#work > div:first-child > *', 'up'],
    ['#work article', 'up'],
    ['#work > div:last-child > div', 'up'],
    ['#experience > p, #experience > h2, #experience > div > div', 'up'],
    ['#about > div > div > *, #about > div > dl', 'up'],
    ['#about > div > div > div:last-child > span', 'pop'],
    ['#contact > div > p, #contact > div > h2, #contact > div > div:first-of-type', 'up'],
    ['ol[id^="dec-"] > li', 'side']
  ];
  const frames = {
    up: [{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'translateY(0)' }],
    side: [{ opacity: 0, transform: 'translateX(-18px)' }, { opacity: 1, transform: 'translateX(0)' }],
    pop: [{ opacity: 0, transform: 'translateY(12px) scale(.85)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
    portrait: [{ opacity: 0, transform: 'translateY(60px) rotate(9deg) scale(.94)' }, { opacity: 1, transform: 'rotate(2.5deg)' }]
  };
  let batch = [], flushQ = false;
  const flush = () => {
    flushQ = false;
    batch.sort((a, b) => { const r = a.getBoundingClientRect(), s = b.getBoundingClientRect(); return r.top - s.top || r.left - s.left; });
    batch.forEach((el, i) => { const a = anims.get(el); if (!a) return; a.effect.updateTiming({ delay: Math.min(i, 6) * 90 }); a.play(); });
    batch = [];
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target); batch.push(e.target);
    if (!flushQ) { flushQ = true; requestAnimationFrame(flush); }
  }), { rootMargin: '0px 0px -8% 0px' });
  const prep = (el, kind) => {
    if (seen.has(el)) return; seen.add(el);
    const a = el.animate(frames[kind], { duration: kind === 'portrait' ? 1200 : 850, easing: kind === 'pop' ? 'cubic-bezier(.3,1.5,.5,1)' : EASE, fill: 'backwards' });
    a.pause(); anims.set(el, a); io.observe(el);
    setTimeout(() => { if (a.playState === 'paused') { io.unobserve(el); a.play(); } }, 3000);
  };

  // count-up
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const t = [...e.target.childNodes].find(n => n.nodeType === 3 && /\d/.test(n.nodeValue)); if (!t) return;
    const end = parseInt(t.nodeValue, 10), t0 = performance.now(), D = 1400;
    const step = now => { const k = Math.min((now - t0) / D, 1); t.nodeValue = String(Math.round(end * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
    t.nodeValue = '0'; setTimeout(() => requestAnimationFrame(step), 200);
  }), { rootMargin: '0px 0px -10% 0px' });
  const counted = new WeakSet();

  const scan = () => {
    mountBar();
    groups.forEach(([sel, kind, map]) => document.querySelectorAll(sel).forEach(el => prep(map ? map(el) : el, kind)));
    document.querySelectorAll('[data-count]').forEach(el => { if (!counted.has(el)) { counted.add(el); cio.observe(el); } });
    onScroll();
  };
  let q = false;
  new MutationObserver(() => { if (!q) { q = true; requestAnimationFrame(() => { q = false; scan(); }); } }).observe(document.documentElement, { childList: true, subtree: true });

  // scroll: progress, parallax, active nav
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    const vc = innerHeight / 2;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const f = parseFloat(el.dataset.parallax) || 0, r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      el.style.translate = '0 ' + ((r.top + r.height / 2 - vc) * f).toFixed(1) + 'px';
    });
    let cur = null;
    ['work', 'experience', 'about'].forEach(id => { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = id; });
    const foot = document.getElementById('contact'); if (foot && foot.getBoundingClientRect().top < innerHeight * .6) cur = null;
    document.querySelectorAll('nav[aria-label="Primary"] a[href^="#"]:not([href="#contact"])').forEach(a => {
      const on = a.getAttribute('href') === '#' + cur;
      a.style.color = on ? ACC : ''; a.style.textDecoration = on ? 'underline' : ''; a.style.textDecorationThickness = on ? '2px' : ''; a.style.textUnderlineOffset = on ? '6px' : '';
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  // click: press + ripple
  const lum = c => { const m = c.match(/[\d.]+/g); if (!m || (m.length > 3 && +m[3] === 0)) return null; return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255; };
  const bgOf = el => { for (let n = el; n && n !== document; n = n.parentElement) { const l = lum(getComputedStyle(n).backgroundColor); if (l !== null) return l; } return 1; };
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest('button, a[href], [role="button"], [onclick]');
    if (!el || el.closest('[role="dialog"][aria-label="Image viewer"]')) return;
    const r = el.getBoundingClientRect(); if (r.width > 700 || r.height > 400) return;
    const cs = getComputedStyle(el), pill = cs.borderRadius !== '0px' || cs.display.includes('flex') || el.tagName === 'BUTTON';
    el.animate([{ scale: '1' }, { scale: '.95', offset: .35 }, { scale: '1' }], { duration: 420, easing: 'cubic-bezier(.3,1.4,.5,1)' });
    if (!pill || el.tagName === 'IMG') return;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;pointer-events:none;overflow:hidden;z-index:9998;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;border-radius:' + cs.borderRadius;
    const d = Math.hypot(r.width, r.height) * 2, dot = document.createElement('span');
    const dark = bgOf(el) < .5;
    dot.style.cssText = 'position:absolute;border-radius:50%;width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px;background:' + (dark ? 'rgba(255,255,255,.28)' : 'rgba(43,74,160,.18)');
    wrap.appendChild(dot); document.body.appendChild(wrap);
    dot.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }], { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => wrap.remove();
  }, { passive: true });

  scan();
})();

;(() => {
  if (window.__bieMotion2) return; window.__bieMotion2 = true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EASE = 'cubic-bezier(.2,.75,.2,1)', INK = '#16171A', ACC = '#2B4AA0';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const done = new WeakSet();
  const once = (el, fn) => { if (!done.has(el)) { done.add(el); fn(el); } };

  // ---------- page transition ----------
  const KEY = 'bie-transition';
  const curtain = (label) => {
    const c = document.createElement('div');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;z-index:10000;background:' + INK + ';color:#F4F2EC;display:flex;align-items:flex-end;padding:clamp(24px,5vw,64px);box-sizing:border-box;pointer-events:none';
    c.innerHTML = '<div style="display:flex;flex-direction:column;gap:12px"><span style="font:12px Spline Sans Mono,monospace;letter-spacing:.08em;text-transform:uppercase;color:#8FA6E8">Opening</span><span style="font:600 clamp(40px,7vw,96px)/.95 Familjen Grotesk,sans-serif;letter-spacing:-.045em">' + (label || '') + '</span></div>';
    document.body.appendChild(c); return c;
  };
  try {
    const t = sessionStorage.getItem(KEY);
    if (t) {
      sessionStorage.removeItem(KEY);
      const go = () => { const c = curtain(t); c.querySelector('div').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
        c.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }], { duration: 800, delay: 150, easing: 'cubic-bezier(.75,0,.2,1)', fill: 'forwards' }).onfinish = () => c.remove(); };
      document.body ? go() : addEventListener('DOMContentLoaded', go);
    }
  } catch (e) {}
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href'); if (!/\.dc\.html/i.test(href) && !/^(index|cng-connect|unitora)\.html/i.test(href)) return;
    const url = new URL(href, location.href); if (url.pathname === location.pathname) return;
    e.preventDefault();
    const art = a.closest('article'), h = art && art.querySelector('h3');
    let label = /portfolio|index/i.test(url.pathname) ? 'All work' : (art ? (art.querySelector('[style*="Spline"] span:nth-child(2)') || {}).textContent : '') || 'Case study';
    try { sessionStorage.setItem(KEY, label); } catch (e) {}
    const c = curtain(label);
    c.animate([{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 700, easing: 'cubic-bezier(.75,0,.2,1)', fill: 'forwards' });
    c.querySelector('div').animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 300, easing: EASE, fill: 'backwards' });
    setTimeout(() => { location.href = url.href; }, 820);
  }, true);
  addEventListener('pageshow', e => { if (e.persisted) document.querySelectorAll('body > div[aria-hidden][style*="z-index: 10000"]').forEach(n => n.remove()); });

  // ---------- smooth inertia scroll (disabled: native scrolling is faster to scan) ----------
  if (false && fine) {
    let target = scrollY, cur = scrollY, running = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const canScroll = (el, dy) => { for (let n = el; n && n !== document.body && n !== document.documentElement; n = n.parentElement) { const cs = getComputedStyle(n); if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 1) { if (dy > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 1 : n.scrollTop > 0) return true; } } return false; };
    const loop = () => { cur += (target - cur) * 0.11; if (Math.abs(target - cur) < 0.5) { cur = target; running = false; } window.scrollTo({ top: cur, behavior: 'instant' }); if (running) requestAnimationFrame(loop); };
    addEventListener('wheel', e => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.documentElement.style.overflow === 'hidden' || document.body.style.overflow === 'hidden') return;
      if (canScroll(e.target, e.deltaY)) return;
      e.preventDefault();
      if (!running) { cur = target = scrollY; }
      target = Math.max(0, Math.min(max(), target + e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1)));
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: false });
    addEventListener('scroll', () => { if (!running) cur = target = scrollY; }, { passive: true });
    addEventListener('keydown', () => { running = false; }, true);
    addEventListener('mousedown', () => { running = false; }, true);
  }

  // ---------- hero words ----------
  const hero = () => {
    const words = [...document.querySelectorAll('[data-word]')];
    words.forEach((el, i) => once(el, () => el.animate([{ transform: 'translateY(110%) rotate(6deg)' }, { transform: 'none' }], { duration: 900, delay: 150 + i * 90, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' })));
    document.querySelectorAll('[data-word-pop]').forEach(el => once(el, () => el.animate([{ opacity: 0, transform: 'rotate(-20deg) scale(.3)' }, { opacity: 1, transform: 'rotate(4deg) scale(1.12)', offset: .6 }, { opacity: 1, transform: 'rotate(-2.5deg) scale(1)' }], { duration: 800, delay: 150 + 3 * 90 + 120, easing: 'cubic-bezier(.3,1.3,.5,1)', fill: 'backwards' })));
  };

  // ---------- marquee ----------
  let vel = 0, lastY = scrollY;
  const marquees = [];
  const marquee = () => document.querySelectorAll('[data-marquee]').forEach(el => once(el, () => {
    const a = el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 38000, iterations: Infinity });
    marquees.push({ el, a });
  }));
  const mloop = () => {
    const d = scrollY - lastY; lastY = scrollY;
    vel += (d - vel) * 0.12;
    const dir = vel < -0.5 ? -1 : 1;
    marquees.forEach(m => { if (m.el.isConnected) m.a.playbackRate = dir * (1 + Math.min(Math.abs(vel) * 0.35, 8)); });
    requestAnimationFrame(mloop);
  };
  requestAnimationFrame(mloop);

  // ---------- stacking project cards ----------
  const TOP = 84;
  const stack = () => {
    document.querySelectorAll('#work > article').forEach(c => { c.style.position = ''; c.style.top = ''; c.style.scale = ''; c.style.filter = ''; c.style.boxShadow = ''; c.style.background = ''; c.style.zIndex = ''; });
  };
  const stackScroll = () => {};

  // ---------- experience: build row by row ----------
  const rio = new IntersectionObserver(es => {
    const hits = es.filter(e => e.isIntersecting).map(e => e.target);
    hits.forEach((el, i) => { rio.unobserve(el); const a = el.__build; if (a) { a.effect.updateTiming({ delay: i * 140 }); a.play(); }
      const line = el.__line; if (line) line.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: i * 140, easing: 'cubic-bezier(.75,0,.2,1)', fill: 'backwards' }); });
  }, { rootMargin: '0px 0px -12% 0px' });
  const timeline = () => document.querySelectorAll('#experience ol > li').forEach(li => once(li, () => {
    li.style.position = 'relative';
    const kids = [...li.children];
    li.__build = { effect: { updateTiming: o => kids.forEach((k, j) => k.__a.effect.updateTiming({ delay: o.delay + 150 + j * 110 })) }, play: () => kids.forEach(k => k.__a.play()) };
    kids.forEach(k => { k.__a = k.animate([{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], { duration: 750, easing: EASE, fill: 'backwards' }); k.__a.pause(); });
    li.__line = null;
    const b = li.getBoundingClientRect();
    if (b.top < innerHeight * .9 && b.bottom > 0) requestAnimationFrame(() => li.__build.play());
    else rio.observe(li);
    setTimeout(() => { if (kids.some(k => k.__a.playState === 'paused')) { rio.unobserve(li); li.__build.play(); } }, 3000);
  }));

  // ---------- tilt + zoom ----------
  if (fine) {
    const panels = () => document.querySelectorAll('#work article > [data-wipe]:not([data-gallery]), #work article > div[data-wipe]');
    let cur = null;
    document.addEventListener('pointermove', e => {
      const p = e.target.closest && e.target.closest('#work article [data-wipe]');
      if (!p || p.hasAttribute('data-gallery') || p.querySelector('[style*="overflow-x"]')) { if (cur) reset(cur); cur = null; return; }
      if (cur && cur !== p) reset(cur);
      if (cur !== p) { cur = p; p.parentElement.style.perspective = '1400px'; p.style.transition = (p.style.transition || '') + ',rotate .25s ease-out'; const im = p.querySelector('img'); if (im) { im.style.transition = 'scale .6s cubic-bezier(.2,.7,.2,1)'; im.style.scale = '1.035'; } }
      const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      p.style.rotate = (-y).toFixed(3) + ' ' + x.toFixed(3) + ' 0 ' + (Math.hypot(x, y) * 9).toFixed(2) + 'deg';
    }, { passive: true });
    const reset = p => { p.style.rotate = ''; const im = p.querySelector('img'); if (im) im.style.scale = ''; };
    document.addEventListener('pointerover', e => {
      const im = e.target.closest && e.target.closest('img[data-lb]'); if (!im) return;
      im.style.transition = 'scale .45s cubic-bezier(.3,1.4,.5,1), translate .45s cubic-bezier(.3,1.4,.5,1), box-shadow .45s';
      im.style.scale = '1.04'; im.style.translate = '0 -6px';
    });
    document.addEventListener('pointerout', e => {
      const im = e.target.closest && e.target.closest('img[data-lb]'); if (!im) return;
      im.style.scale = ''; im.style.translate = '';
    });
  }

  const scan = () => { hero(); marquee(); timeline(); stack(); stackScroll(); };
  let q = false;
  new MutationObserver(() => { if (!q) { q = true; requestAnimationFrame(() => { q = false; scan(); }); } }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('scroll', () => requestAnimationFrame(stackScroll), { passive: true });
  addEventListener('resize', () => { stack(); stackScroll(); });
  addEventListener('load', scan);
  scan();
})();
