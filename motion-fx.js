(() => {
  if (window.__motionFx) return; window.__motionFx = 1;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const EASE = 'cubic-bezier(.2,.75,.2,1)', clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const st = document.createElement('style');
  st.textContent = `
.mx-top{position:fixed;right:20px;bottom:20px;z-index:60;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.45);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 10px 30px -12px rgba(22,23,26,.35);color:#16171A;cursor:pointer;display:grid;place-items:center;opacity:0;translate:0 16px;scale:.8;pointer-events:none;transition:opacity .4s ${EASE},translate .5s ${EASE},scale .5s ${EASE},background .25s,color .25s}
.mx-top.on{opacity:1;translate:0 0;scale:1;pointer-events:auto}
.mx-top:hover{background:rgba(22,23,26,.88);color:#F4F2EC}
.mx-top svg{position:absolute;inset:0;transform:rotate(-90deg)}
.mx-top circle{fill:none;stroke-width:2}
:focus-visible{outline:2px solid #2B4AA0;outline-offset:3px;border-radius:6px}
.mx-nav{transition:background .35s,box-shadow .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s}
.mx-nav.mx-solid{background:rgba(244,242,236,.82)!important;-webkit-backdrop-filter:blur(22px) saturate(1.7);backdrop-filter:blur(22px) saturate(1.7);box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 16px 36px -18px rgba(22,23,26,.45)}
.mx-mag{transition:translate .35s ${EASE}}
@media (prefers-reduced-motion:reduce){.mx-top,.mx-nav,.mx-mag{transition:none}}`;
  document.head.appendChild(st);

  // glass nav: frosts after scroll
  const navEl = () => { const h = [...document.querySelectorAll('header')].find(n => /fixed|sticky/.test(getComputedStyle(n).position)); return h && h.firstElementChild; };

  // back-to-top with progress ring
  let top;
  const mkTop = () => {
    top = document.createElement('button'); top.className = 'mx-top'; top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" stroke="#2B4AA0" stroke-dasharray="144.5" stroke-dashoffset="144.5" pathLength="144.5"/></svg><svg style="position:static;transform:none" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14V4M4.5 8.5 9 4l4.5 4.5"/></svg>';
    top.onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.body.appendChild(top);
  };

  // image entry (mask + settle)
  const iio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; iio.unobserve(e.target);
    if (reduced) return;
    e.target.animate([{ clipPath: 'inset(0 0 100% 0)', scale: 1.12 }, { clipPath: 'inset(0 0 0% 0)', scale: 1 }], { duration: 1000, easing: EASE, fill: 'backwards' });
  }), { threshold: .15 });
  const seenImg = new WeakSet();

  // exit: figures ease back as they leave the top
  const exits = new Set();
  const scan = () => {
    glowOn();
    document.querySelectorAll('img').forEach(i => { if (!seenImg.has(i) && !i.closest('header,nav,[data-gf-mount]')) { seenImg.add(i); iio.observe(i); } });
    document.querySelectorAll('main figure, section figure').forEach(f => { if (!exits.has(f)) { exits.add(f); f.style.transformOrigin = '50% 0'; } });
    document.querySelectorAll('button,a').forEach(b => {
      if (!fine || reduced || b.__mag || b.closest('#work article,[data-gf-mount],.mx-top')) return;
      const r = b.getBoundingClientRect(); if (!r.width || r.width > 280 || r.height > 72) return;
      if (!(b.matches('button') || b.hasAttribute('data-mag') || b.closest('header,nav,footer'))) return;
      b.__mag = 1; b.classList.add('mx-mag');
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + 'px'; });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  };

  // hero cursor glow
  const glowOn = () => {
    const hero = document.querySelector('main > section:first-child'); if (!hero || hero.__g || !fine || reduced) return; hero.__g = 1;
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); hero.style.backgroundImage = 'radial-gradient(420px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px,rgba(43,74,160,.12),transparent 70%)'; });
    hero.addEventListener('pointerleave', () => { hero.style.backgroundImage = ''; });
  };

  // case study chapter rail
  let rail;
  const mkRail = () => {
    if (rail || document.getElementById('work') || innerWidth < 1280) return;
    const hs = [...document.querySelectorAll('main h2')]; if (hs.length < 3) return;
    rail = document.createElement('nav'); rail.setAttribute('aria-label', 'Chapters');
    rail.style.cssText = 'position:fixed;left:18px;top:50%;translate:0 -50%;z-index:30;display:flex;flex-direction:column;gap:4px;padding:10px 8px;border-radius:999px;background:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.7);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 10px 30px -14px rgba(22,23,26,.35)';
    hs.forEach(h => {
      const b = document.createElement('button'); b.setAttribute('aria-label', h.textContent.trim());
      b.style.cssText = 'all:unset;cursor:pointer;position:relative;width:20px;height:20px;display:grid;place-items:center;border-radius:50%';
      b.innerHTML = '<i style="width:7px;height:7px;border-radius:50%;background:#16171A;opacity:.3;transition:all .3s"></i><span style="position:absolute;left:30px;white-space:nowrap;font:500 12px Spline Sans Mono,monospace;background:#16171A;color:#F4F2EC;padding:5px 9px;border-radius:999px;opacity:0;translate:-6px 0;pointer-events:none;transition:opacity .2s,translate .2s">' + h.textContent.trim().slice(0, 40).replace(/</g, '') + '</span>';
      b.onmouseenter = b.onfocus = () => { const s = b.lastChild; s.style.opacity = 1; s.style.translate = '0 0'; };
      b.onmouseleave = b.onblur = () => { const s = b.lastChild; s.style.opacity = 0; s.style.translate = '-6px 0'; };
      b.onclick = () => scrollTo({ top: h.getBoundingClientRect().top + scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
      rail.appendChild(b); b.__h = h;
    });
    document.body.appendChild(rail);
  };
  const railUpdate = () => {
    if (!rail) return; let act = -1;
    [...rail.children].forEach((b, i) => { if (b.__h.getBoundingClientRect().top < innerHeight * .4) act = i; });
    [...rail.children].forEach((b, i) => { const d = b.firstChild; d.style.opacity = i === act ? 1 : .3; d.style.background = i === act ? '#2B4AA0' : '#16171A'; d.style.transform = i === act ? 'scale(1.7)' : 'scale(1)'; });
  };

  // mobile glass contact bar (home)
  let bar;
  const mkBar = () => {
    if (bar || !document.getElementById('work') || !document.getElementById('contact')) return;
    bar = document.createElement('a'); bar.href = '#contact'; bar.textContent = 'Contact Ben';
    bar.style.cssText = 'position:fixed;left:50%;bottom:16px;translate:-50% 20px;opacity:0;pointer-events:none;z-index:55;text-decoration:none;font:500 15px Hanken Grotesk,sans-serif;color:#F4F2EC;background:rgba(22,23,26,.82);-webkit-backdrop-filter:blur(14px) saturate(1.5);backdrop-filter:blur(14px) saturate(1.5);padding:0 26px;min-height:48px;display:none;align-items:center;border-radius:999px;box-shadow:0 14px 34px -12px rgba(22,23,26,.6);transition:opacity .4s,translate .5s ' + EASE;
    document.body.appendChild(bar);
  };
  const barUpdate = () => {
    const ce = document.getElementById('contact'); if (!bar || !ce) return; const c = ce.getBoundingClientRect();
    const show = innerWidth < 761 && scrollY > innerHeight * .6 && c.top > innerHeight * .8;
    bar.style.display = innerWidth < 761 ? 'inline-flex' : 'none';
    bar.style.opacity = show ? 1 : 0; bar.style.translate = show ? '-50% 0' : '-50% 20px'; bar.style.pointerEvents = show ? 'auto' : 'none';
  };

  let tick = false;
  const update = () => {
    tick = false;
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    const n = navEl(); if (n) { n.classList.add('mx-nav'); n.classList.toggle('mx-solid', y > 40); }
    if (!top && document.body) mkTop();
    if (top) { top.classList.toggle('on', y > vh * .8); top.querySelector('circle').style.strokeDashoffset = 144.5 * (1 - clamp(y / Math.max(1, max), 0, 1)); }
    mkRail(); railUpdate(); mkBar(); barUpdate();
    if (reduced) return;
    exits.forEach(f => {
      if (!f.isConnected) return exits.delete(f);
      const r = f.getBoundingClientRect(), t = clamp(1 - r.bottom / (vh * .45), 0, 1);
      f.style.scale = t > 0 && r.bottom > -vh ? (1 - .05 * t).toFixed(3) : '';
      f.style.opacity = t > 0 && r.bottom > -vh ? (1 - .35 * t).toFixed(3) : '';
    });
  };
  const on = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
  addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
  let q = false;
  new MutationObserver(() => { if (!q) { q = true; requestAnimationFrame(() => { q = false; scan(); on(); }); } }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('DOMContentLoaded', () => { scan(); on(); });
})();
