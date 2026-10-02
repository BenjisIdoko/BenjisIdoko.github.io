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
