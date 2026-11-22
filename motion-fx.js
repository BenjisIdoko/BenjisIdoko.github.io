(() => {
  if (window.__motionFx) return; window.__motionFx = 1;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const EASE = 'cubic-bezier(.2,.75,.2,1)', clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const st = document.createElement('style');
  st.textContent = `
.mx-top{position:fixed;right:20px;bottom:20px;z-index:60;width:48px;height:48px;border-radius:50%;border:1px solid color-mix(in srgb,var(--surface) 70%,transparent);background:color-mix(in srgb,var(--surface) 45%,transparent);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--surface) 80%,transparent),0 10px 30px -12px color-mix(in srgb,var(--shade) 35%,transparent);color:var(--ink);cursor:pointer;display:grid;place-items:center;opacity:0;translate:0 16px;scale:.8;pointer-events:none;transition:opacity .4s ${EASE},translate .5s ${EASE},scale .5s ${EASE},background .25s,color .25s}
.mx-top.on{opacity:1;translate:0 0;scale:1;pointer-events:auto}
.mx-top:hover{background:var(--ink);color:var(--paper)}
.mx-top svg{position:absolute;inset:0;transform:rotate(-90deg)}
.mx-top circle{fill:none;stroke-width:2}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
.mx-nav{transition:background .35s,box-shadow .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s}
.mx-nav.mx-solid{background:color-mix(in srgb,var(--paper) 82%,transparent)!important;-webkit-backdrop-filter:blur(22px) saturate(1.7);backdrop-filter:blur(22px) saturate(1.7);box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 16px 36px -18px color-mix(in srgb,var(--shade) 45%,transparent)}
.mx-mag{transition:translate .35s ${EASE}}
@media (max-width:760px){body:has(#contact) .mx-top{display:none}}
@media (prefers-reduced-motion:reduce){.mx-top,.mx-nav,.mx-mag{transition:none}}`;
  document.head.appendChild(st);

  // glass nav: frosts after scroll
  const navEl = () => { const h = [...document.querySelectorAll('header')].find(n => /fixed|sticky/.test(getComputedStyle(n).position)); return h && h.firstElementChild; };

  // back-to-top with progress ring
  let top;
  const mkTop = () => {
    top = document.createElement('button'); top.className = 'mx-top'; top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" stroke="var(--accent)" stroke-dasharray="144.5" stroke-dashoffset="144.5" pathLength="144.5"/></svg><svg style="position:static;transform:none" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14V4M4.5 8.5 9 4l4.5 4.5"/></svg>';
    top.onclick = () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.body.appendChild(top);
  };

  // image entry (mask + settle)
  const iio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; iio.unobserve(e.target);
    if (reduced) return;
    e.target.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: EASE, fill: 'backwards' });
  }), { threshold: .15 });
  const seenImg = new WeakSet();

  // exit: figures ease back as they leave the top
  const exits = new Set();
  const scan = () => {
    glowOn();
    document.querySelectorAll('img').forEach(i => { if (!seenImg.has(i) && !i.closest('header,nav,[data-gf-mount]')) { seenImg.add(i); iio.observe(i); } });
  };

  // hero cursor glow
  const glowOn = () => {
    return; const hero = document.querySelector('main > section:first-child'); if (!hero || hero.__g || !fine || reduced) return; hero.__g = 1;
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); hero.style.backgroundImage = 'radial-gradient(420px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px,rgba(43,74,160,.12),transparent 70%)'; });
    hero.addEventListener('pointerleave', () => { hero.style.backgroundImage = ''; });
  };

  // case study chapter rail
  let rail;
  const mkRail = () => {
    if (rail || document.getElementById('work') || innerWidth < 1500) return;
    const hs = [...document.querySelectorAll('main h2')]; if (hs.length < 3) return;
    rail = document.createElement('nav'); rail.setAttribute('aria-label', 'Chapters');
    rail.style.cssText = 'position:fixed;left:18px;top:50%;translate:0 -50%;z-index:30;display:flex;flex-direction:column;gap:4px;padding:10px 8px;border-radius:999px;background:color-mix(in srgb,var(--surface) 45%,transparent);border:1px solid color-mix(in srgb,var(--surface) 70%,transparent);-webkit-backdrop-filter:blur(16px) saturate(1.6);backdrop-filter:blur(16px) saturate(1.6);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--surface) 80%,transparent),0 10px 30px -14px color-mix(in srgb,var(--shade) 35%,transparent)';
    hs.forEach(h => {
      const b = document.createElement('button'); b.setAttribute('aria-label', h.textContent.trim());
      b.style.cssText = 'all:unset;cursor:pointer;position:relative;width:20px;height:20px;display:grid;place-items:center;border-radius:50%';
      b.innerHTML = '<i style="width:7px;height:7px;border-radius:50%;background:var(--ink);opacity:.3;transition:all .3s"></i><span style="position:absolute;left:30px;white-space:nowrap;font:500 12px Spline Sans Mono,monospace;background:var(--ink);color:var(--paper);padding:5px 9px;border-radius:999px;opacity:0;translate:-6px 0;pointer-events:none;transition:opacity .2s,translate .2s">' + h.textContent.trim().slice(0, 40).replace(/</g, '') + '</span>';
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
    [...rail.children].forEach((b, i) => { const d = b.firstChild; b.setAttribute('aria-current', i === act ? 'true' : 'false'); d.style.opacity = i === act ? 1 : .3; d.style.background = i === act ? 'var(--accent)' : 'var(--ink)'; d.style.transform = i === act ? 'scale(1.7)' : 'scale(1)'; });
  };

  // mobile glass contact bar (home)
  let bar;
  const mkBar = () => {
    if (bar || !document.getElementById('work') || !document.getElementById('contact')) return;
    bar = document.createElement('a'); bar.href = '#contact'; bar.textContent = 'Contact Ben';
    bar.style.cssText = 'position:fixed;left:50%;bottom:16px;translate:-50% 20px;opacity:0;pointer-events:none;z-index:55;text-decoration:none;font:500 15px Hanken Grotesk,sans-serif;color:var(--paper);background:color-mix(in srgb,var(--ink) 82%,transparent);-webkit-backdrop-filter:blur(14px) saturate(1.5);backdrop-filter:blur(14px) saturate(1.5);padding:0 26px;min-height:48px;display:none;align-items:center;border-radius:999px;box-shadow:0 14px 34px -12px rgba(22,23,26,.6);transition:opacity .4s,translate .5s ' + EASE;
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
