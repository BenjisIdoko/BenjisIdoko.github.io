(() => {
  if (matchMedia('(hover:none)').matches) return;
  const W = 260, H = 162, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let card, img, cur, openT, closeT, vis = false, tx = 0, vx = 0, raf = 0, ox = 0;
  const src = u => 'https://api.microlink.io/?' + new URLSearchParams({ url: u, screenshot: 'true', meta: 'false', embed: 'screenshot.url', colorScheme: 'dark', 'viewport.isMobile': 'true', 'viewport.deviceScaleFactor': '1', 'viewport.width': W * 3, 'viewport.height': H * 3 });
  const make = () => {
    if (card) return;
    card = document.createElement('a'); card.target = '_blank'; card.rel = 'noopener'; card.setAttribute('aria-hidden', 'true'); card.tabIndex = -1;
    card.style.cssText = 'position:fixed;left:0;top:0;z-index:90;display:block;padding:4px;background:#fff;border-radius:14px;box-shadow:0 18px 40px -14px rgba(22,23,26,.45),0 0 0 1px rgba(22,23,26,.08);opacity:0;pointer-events:none;transform-origin:50% 100%;transition:opacity .18s,scale .3s cubic-bezier(.34,1.56,.64,1);scale:.7;font-size:0';
    img = new Image(); img.width = W; img.height = H; img.alt = '';
    img.style.cssText = 'display:block;border-radius:10px;background:#E9E5DA;width:' + W + 'px;height:' + H + 'px;object-fit:cover';
    img.onerror = () => close(true);
    card.appendChild(img); document.body.appendChild(card);
    card.addEventListener('mouseenter', () => clearTimeout(closeT));
    card.addEventListener('mouseleave', () => close());
  };
  const place = () => {
    if (!cur) return;
    const r = cur.getBoundingClientRect();
    const left = Math.max(8, Math.min(innerWidth - W - 16, r.left + r.width / 2 - (W + 8) / 2 + tx));
    const top = r.top - H - 8 - 14;
    card.style.translate = left + 'px ' + (top < 8 ? r.bottom + 14 : top) + 'px';
    card.style.transformOrigin = top < 8 ? '50% 0' : '50% 100%';
  };
  const tick = () => {
    vx += (ox - tx) * .06; vx *= .78; tx += vx;
    place();
    raf = vis && (Math.abs(ox - tx) > .3 || Math.abs(vx) > .1) ? requestAnimationFrame(tick) : 0;
  };
  const open = a => {
    make(); cur = a; const u = a.href;
    if (img.dataset.u !== u) { img.dataset.u = u; img.src = src(u); }
    card.href = u; tx = ox = 0; vx = 0; place();
    vis = true; card.style.pointerEvents = 'auto'; card.style.opacity = 1; card.style.scale = 1;
  };
  const close = now => {
    clearTimeout(openT); clearTimeout(closeT);
    const f = () => { vis = false; if (card) { card.style.opacity = 0; card.style.scale = '.7'; card.style.pointerEvents = 'none'; } };
    now ? f() : (closeT = setTimeout(f, 100));
  };
  const ok = a => a && a.href && /^https?:/.test(a.href) && a.origin !== location.origin && !a.hasAttribute('data-no-preview') && !a.closest('[data-lb],#contact-title');
  document.addEventListener('mouseover', e => {
    const a = e.target.closest && e.target.closest('a');
    if (!ok(a) || a === cur && vis) { if (a === cur) clearTimeout(closeT); return; }
    clearTimeout(closeT); clearTimeout(openT);
    openT = setTimeout(() => open(a), 50);
  });
  document.addEventListener('mouseout', e => {
    const a = e.target.closest && e.target.closest('a');
    if (a && a === cur || openT) { clearTimeout(openT); if (!(e.relatedTarget && card && card.contains(e.relatedTarget))) close(); }
  });
  document.addEventListener('mousemove', e => {
    if (!vis || !cur || reduce) return;
    const r = cur.getBoundingClientRect();
    ox = (e.clientX - r.left - r.width / 2) / 2;
    if (!raf) raf = requestAnimationFrame(tick);
  });
  addEventListener('scroll', () => close(true), { passive: true });
})();
