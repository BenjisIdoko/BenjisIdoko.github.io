(() => {
  if (window.__bieGlass) return; window.__bieGlass = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 340, H = 272, HEAD = 60, FH = H - 74, SW = 272, SH = 184;
  const BACK = 'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z';
  const FRONT = 'M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ' + (FH - 22) + 'A22 22 0 0 1 318 ' + FH + 'L22 ' + FH + 'A22 22 0 0 1 0 ' + (FH - 22) + 'Z';
  const ART = {
    aurora: 'radial-gradient(70% 90% at 15% 20%,#e9c2b8 0,transparent 60%),radial-gradient(60% 80% at 85% 25%,#6f97c2 0,transparent 62%),radial-gradient(80% 70% at 55% 95%,#c2433f 0,transparent 65%),linear-gradient(135deg,#f4efe9,#22395e)',
    dusk: 'radial-gradient(70% 90% at 80% 15%,#eab08a 0,transparent 60%),radial-gradient(70% 80% at 10% 40%,#8f6c9c 0,transparent 62%),radial-gradient(80% 70% at 60% 100%,#b3502f 0,transparent 65%),linear-gradient(135deg,#3e2850,#120c18)',
    verdant: 'radial-gradient(70% 90% at 20% 15%,#e9cf87 0,transparent 60%),radial-gradient(70% 80% at 85% 45%,#4f7a5a 0,transparent 62%),radial-gradient(80% 70% at 40% 100%,#a7843a 0,transparent 65%),linear-gradient(135deg,#173024,#070b08)'
  };

  const css = `
.gl-blob{position:fixed;z-index:-1;border-radius:50%;filter:blur(70px);pointer-events:none;will-change:transform}
.gf-mount{display:block;width:100%}
.gf-root{--gf-px:0;--gf-py:0;--gf-sp:0;--gf-ease:cubic-bezier(.2,.8,.2,1);--gf-spring:cubic-bezier(.34,1.36,.5,1);--gf-hinge:0deg;--gf-lift:42px;--gf-spread:0px;--gf-fan:0deg;--gf-stack:15px;--gf-ink:#141416;--gf-soft:rgba(20,20,22,.58);position:relative;display:block;isolation:isolate;font-family:'Hanken Grotesk',system-ui,sans-serif;-webkit-tap-highlight-color:transparent}
.gf-root[data-tone=dark]{--gf-ink:#f5f5f7;--gf-soft:rgba(245,245,247,.62)}
.gf-root:hover,.gf-root:focus-within,.gf-root[data-peek]{--gf-hinge:-11deg;--gf-lift:-34px;--gf-spread:8px;--gf-fan:1.4deg;--gf-stack:11px}
.gf-root[data-open]{--gf-hinge:-24deg;--gf-lift:-96px;--gf-spread:40px;--gf-fan:4deg;--gf-stack:var(--gf-open-stack,30px);z-index:6}
.gf-stage{position:absolute;left:0;top:0;width:340px;height:272px;transform-origin:0 0}
.gf-tilt{position:absolute;inset:0;transform:perspective(1400px) rotateX(calc(var(--gf-py)*-3deg + var(--gf-sp)*3deg)) rotateY(calc(var(--gf-px)*4deg));transition:transform .9s var(--gf-ease)}
.gf-shadow{position:absolute;left:18px;right:18px;bottom:-6px;height:60px;border-radius:40px;background:rgba(16,18,24,.34);filter:blur(22px);transition:opacity .9s var(--gf-ease)}
.gf-back{position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#f3f3f4,#e3e3e6)}
.gf-art{position:absolute;left:-30px;top:-30px;right:-30px;bottom:-30px;background-size:cover;transform:translate(calc(var(--gf-px)*-9px),calc(var(--gf-py)*-7px + var(--gf-sp)*-26px)) scale(1.08);transition:transform 1.1s var(--gf-ease)}
.gf-sheen{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.24),rgba(255,255,255,0) 22%),radial-gradient(120% 80% at 80% 0,rgba(255,255,255,.16),transparent 60%);pointer-events:none}
.gf-rim{position:absolute;left:0;top:0;max-width:none;overflow:visible;pointer-events:none;fill:none}
.gf-brim{width:340px;height:272px}.gf-brim path{stroke:rgba(255,255,255,.5);stroke-width:1}
.gf-files{position:absolute;inset:0;z-index:5;pointer-events:none;clip-path:inset(-400px -400px 10px -400px)}
.gf-sheet{position:absolute;left:34px;top:96px;width:272px;height:184px;box-sizing:border-box;border-radius:16px;overflow:hidden;pointer-events:auto;text-decoration:none;color:#18181b;background:linear-gradient(180deg,#fff,#f2f2f0);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 0 0 .5px rgba(0,0,0,.1),0 10px 26px -8px rgba(10,12,20,.28);transform-origin:50% 100%;transform:translate(calc(var(--gf-jx) + var(--gf-slot)*var(--gf-spread)),calc(var(--gf-lift) + var(--gf-depth)*var(--gf-stack)*-1)) rotate(calc(var(--gf-jr) + var(--gf-slot)*var(--gf-fan)));transition:transform .75s var(--gf-spring) calc(var(--gf-depth)*40ms),box-shadow .4s var(--gf-ease),translate .9s var(--gf-ease),opacity .9s var(--gf-ease)}
.gf-root[data-tone=dark] .gf-sheet{background:linear-gradient(180deg,#2c2c30,#1c1c1f);color:#f4f4f5}
a.gf-sheet{cursor:pointer}
.gf-root[data-open] .gf-sheet:hover,.gf-root[data-open] .gf-sheet:focus-visible{transform:translate(calc(var(--gf-jx) + var(--gf-slot)*var(--gf-spread)),calc(var(--gf-lift) + var(--gf-depth)*var(--gf-stack)*-1 - 16px)) rotate(calc(var(--gf-slot)*var(--gf-fan)*.6));box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 0 0 .5px rgba(0,0,0,.1),0 22px 40px -12px rgba(10,12,20,.42);transition-delay:0s}
.gf-sheet:focus-visible{outline:2px solid #2B4AA0;outline-offset:2px}
.gf-pic{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top}
.gf-sheet--pic::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.5),transparent 40%);pointer-events:none}
.gf-head{position:absolute;left:14px;right:14px;top:11px;z-index:1;display:flex;align-items:baseline;justify-content:space-between;gap:10px;white-space:nowrap}
.gf-name{overflow:hidden;text-overflow:ellipsis;font-size:13px;font-weight:600;letter-spacing:-.005em}
.gf-fmeta{flex:none;font:10px 'Spline Sans Mono',ui-monospace,monospace;letter-spacing:.02em;opacity:.55}
.gf-sheet--pic .gf-head{color:#fff}.gf-sheet--pic .gf-fmeta{opacity:.8}
.gf-desc{position:absolute;left:14px;right:14px;top:42px;margin:0;font-size:12.5px;line-height:1.45;opacity:.68}
.gf-front{position:absolute;left:0;top:74px;width:340px;height:198px;z-index:10;-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5);transform-origin:50% 100%;transform:perspective(760px) rotateX(var(--gf-hinge));transition:transform .8s var(--gf-spring),translate 1s var(--gf-ease),opacity 1s var(--gf-ease)}
.gf-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.5) 42%,rgba(252,252,252,.9))}
.gf-root[data-tone=dark] .gf-tint{background:linear-gradient(180deg,rgba(18,18,20,.18),rgba(14,14,16,.62) 46%,rgba(8,8,10,.92))}
.gf-spec{position:absolute;inset:0;background:radial-gradient(260px 200px at calc(50% + var(--gf-px)*46%) calc(30% + var(--gf-py)*40%),rgba(255,255,255,.5),transparent 70%);mix-blend-mode:soft-light;pointer-events:none}
.gf-frim{width:340px;height:198px}.gf-frim path{stroke-width:2.4}
.gf-hit{all:unset;position:absolute;inset:0;z-index:1;cursor:pointer}
.gf-front:has(.gf-hit:focus-visible) .gf-frim path{stroke-width:5}
.gf-label{position:absolute;left:28px;bottom:32px;z-index:2;display:flex;flex-direction:column;gap:4px;max-width:260px;pointer-events:none;color:var(--gf-ink)}
.gf-title{font:500 20px/1.15 'Familjen Grotesk',sans-serif;letter-spacing:-.015em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gf-meta{font:12px 'Spline Sans Mono',ui-monospace,monospace;letter-spacing:.03em;color:var(--gf-soft)}
.gf-chev{position:absolute;right:24px;bottom:28px;z-index:2;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;pointer-events:none;background:rgba(255,255,255,.55);box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(0,0,0,.08);color:var(--gf-ink);transition:transform .5s var(--gf-spring)}
.gf-root[data-tone=dark] .gf-chev{background:rgba(255,255,255,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 0 0 1px rgba(255,255,255,.1)}
.gf-root[data-open] .gf-chev{transform:rotate(180deg)}
.gf-chev svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.gf-root:not([data-entered]) .gf-back,.gf-root:not([data-entered]) .gf-brim{translate:0 22px;opacity:0}
.gf-root:not([data-entered]) .gf-sheet{translate:0 -120px;opacity:0}
.gf-root:not([data-entered]) .gf-front{translate:0 46px;opacity:0}
.gf-root:not([data-entered]) .gf-shadow{opacity:0}
.gf-back,.gf-brim{transition:translate 1s var(--gf-ease),opacity .9s var(--gf-ease)}
.gf-root[data-entered] .gf-sheet{transition-delay:calc(var(--gf-depth)*40ms),0s,calc(.18s + var(--gf-depth)*90ms),calc(.18s + var(--gf-depth)*90ms)}
.gf-root[data-entered] .gf-front{transition-delay:0s,.42s,.42s}
.gl-btn{background:rgba(255,255,255,.42)!important;-webkit-backdrop-filter:blur(14px) saturate(1.6);backdrop-filter:blur(14px) saturate(1.6);border-color:rgba(255,255,255,.7)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 0 0 1px rgba(22,23,26,.14),0 10px 20px -12px rgba(22,23,26,.35);transition:background .3s,color .3s,box-shadow .3s}
.gl-btn:hover{background:rgba(22,23,26,.88)!important;color:#F4F2EC!important}
html[data-glass=A] .gl-blob,html[data-glass=B] .gl-blob{opacity:.07!important}
html[data-glass=B] [data-tk=back]{background:radial-gradient(70% 90% at 20% 20%,#6f97c2,transparent 60%),radial-gradient(60% 80% at 85% 30%,#e9c2b8,transparent 62%),radial-gradient(80% 70% at 55% 100%,#c2433f,transparent 65%),linear-gradient(135deg,#22395e,#1F3A85)!important}
html[data-glass=B] [data-tk=front]{background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(255,255,255,.5) 42%,rgba(252,252,252,.9))!important;-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5);box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 0 0 1.5px rgba(255,255,255,.6),0 36px 50px -28px rgba(22,23,26,.5)!important}
html[data-glass=B] [data-tk=hair]{display:none}
html[data-glass=B] [data-tk=row]{background:rgba(255,255,255,.4)!important;-webkit-backdrop-filter:blur(14px) saturate(1.6);backdrop-filter:blur(14px) saturate(1.6);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 10px 20px -14px rgba(22,23,26,.3)}
html[data-glass=B] [data-tk=row][aria-pressed=true]{background:rgba(255,255,255,.88)!important}
@media (prefers-reduced-motion:reduce){.gf-root *{transition-duration:0s!important;transition-delay:0s!important}}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ambient colour behind the glass, drifting with scroll
  const blobs = [['#2B4AA0', .26, 520, '-8vw', '6vh'], ['#2E9E63', .2, 460, '70vw', '40vh'], ['#E9B866', .34, 560, '30vw', '75vh']].map(([c, o, s, x, y]) => {
    const b = document.createElement('div'); b.className = 'gl-blob'; b.setAttribute('aria-hidden', 'true');
    b.style.cssText = `left:${x};top:${y};width:${s}px;height:${s}px;background:radial-gradient(closest-side,${c},transparent);opacity:${o}`;
    document.body.appendChild(b); return b;
  });

  const done = new WeakSet();
  const esc = s => (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const folders = [];

  const build = host => {
    if (done.has(host)) return; done.add(host);
    const mount = host.querySelector('[data-gf-mount]'); if (!mount) return;
    const items = [...host.querySelectorAll('[data-f]')].map(f => ({ ...f.dataset }));
    const d = host.dataset, n = items.length;
    const sheets = items.map((f, i) => {
      const slot = n <= 1 ? 0 : (i / (n - 1)) * 2 - 1, r = (Math.sin(i * 12.9898 + n) * 43758.5453) % 1;
      const st = `--gf-slot:${slot.toFixed(2)};--gf-depth:${n - 1 - i};--gf-jx:${(r * 5).toFixed(1)}px;--gf-jr:${(r * 1.6).toFixed(2)}deg;z-index:${i + 1}`;
      const head = `<span class="gf-head"><span class="gf-name">${esc(f.name)}</span>${f.meta ? `<span class="gf-fmeta">${esc(f.meta)}</span>` : ''}</span>`;
      const body = f.img ? `<img class="gf-pic" src="${esc(f.img)}" alt="" loading="lazy">` : (f.desc ? `<p class="gf-desc">${esc(f.desc)}</p>` : '');
      const cls = 'gf-sheet' + (f.img ? ' gf-sheet--pic' : '');
      return f.href ? `<a role="listitem" class="${cls}" style="${st}" href="${esc(f.href)}" target="_blank" rel="noopener">${head}${body}</a>` : `<div role="listitem" class="${cls}" style="${st}">${head}${body}</div>`;
    }).join('');
    mount.innerHTML = `<div class="gf-root" data-tone="${d.tone || 'light'}" style="--gf-open-stack:${Math.min(34, Math.floor(150 / Math.max(1, n - 1)))}px"><div class="gf-stage"><div class="gf-tilt">
<div class="gf-shadow" aria-hidden="true"></div>
<div class="gf-back" style="clip-path:path('${BACK}')" aria-hidden="true"><div class="gf-art" style="background:${ART[d.art] || ART.aurora}"></div><div class="gf-sheen"></div></div>
<svg class="gf-rim gf-brim" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path d="${BACK}"/></svg>
<div class="gf-front" style="clip-path:path('${FRONT}')"><div class="gf-tint" aria-hidden="true"></div><div class="gf-spec" aria-hidden="true"></div>
<svg class="gf-rim gf-frim" viewBox="0 0 ${W} ${FH}" aria-hidden="true"><defs><linearGradient id="gfr${folders.length}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs><path d="${FRONT}" stroke="url(#gfr${folders.length})"/></svg>
<button type="button" class="gf-hit" aria-expanded="false" aria-label="Open ${esc(d.label)}, ${n} items"></button>
<div class="gf-label"><span class="gf-title">${esc(d.label)}</span><span class="gf-meta">${esc(d.meta || n + ' items')}</span></div>
<span class="gf-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg></span></div>
<div class="gf-files" role="list" aria-label="${esc(d.label)} contents" inert>${sheets}</div>
</div></div></div>`;
    const root = mount.firstElementChild, hit = root.querySelector('.gf-hit'), files = root.querySelector('.gf-files');
    const setOpen = o => { root.toggleAttribute('data-open', o); hit.setAttribute('aria-expanded', o); files.toggleAttribute('inert', !o); };
    hit.addEventListener('click', () => setOpen(!root.hasAttribute('data-open')));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.hasAttribute('data-open')) { setOpen(false); hit.focus(); } });
    document.addEventListener('pointerdown', e => { if (root.hasAttribute('data-open') && !root.contains(e.target)) setOpen(false); });
    root.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch' || reduced) return;
      const r = root.getBoundingClientRect();
      root.style.setProperty('--gf-px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      root.style.setProperty('--gf-py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    root.addEventListener('pointerleave', () => { root.style.setProperty('--gf-px', 0); root.style.setProperty('--gf-py', 0); });
    const fit = () => {
      const k = Math.min(1, mount.clientWidth / W) || 1;
      root.style.width = W * k + 'px'; root.style.height = (H + HEAD) * k + 'px'; root.style.margin = '0 auto';
      root.firstElementChild.style.transform = `translateY(${HEAD * k}px) scale(${k})`;
    };
    fit(); new ResizeObserver(fit).observe(mount);
    const eio = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { eio.disconnect(); setTimeout(() => root.setAttribute('data-entered', ''), (parseInt(d.delay, 10) || 0)); }
    }), { threshold: .25 });
    if (reduced) root.setAttribute('data-entered', ''); else eio.observe(root);
    folders.push(root); onScroll();
  };

  // scroll: ambient drift, folder parallax and viewport peek, heading blur-in
  let tk = false;
  const update = () => {
    tk = false;
    const y = scrollY, h = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = y / h;
    if (!reduced) {
      blobs[0].style.transform = `translate(${(p * 30).toFixed(1)}vw,${(p * 60).toFixed(1)}vh) scale(${(1 + p * .4).toFixed(2)})`;
      blobs[1].style.transform = `translate(${(-p * 40).toFixed(1)}vw,${(p * -30).toFixed(1)}vh)`;
      blobs[2].style.transform = `translate(${(p * 20).toFixed(1)}vw,${(-p * 70).toFixed(1)}vh) scale(${(1.2 - p * .3).toFixed(2)})`;
    }
    folders.forEach(root => {
      if (!root.isConnected) return;
      const r = root.getBoundingClientRect(), c = (r.top + r.height / 2) / innerHeight;
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      root.style.setProperty('--gf-sp', Math.max(-1, Math.min(1, (c - .5) * 2)).toFixed(3));
      root.toggleAttribute('data-peek', !reduced && c > .38 && c < .62 && !root.hasAttribute('data-open'));
    });
  };
  function onScroll() { if (!tk) { tk = true; requestAnimationFrame(update); } }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);

  const hio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; hio.unobserve(e.target);
    e.target.animate([{ filter: 'blur(14px)', opacity: 0, letterSpacing: '.02em' }, { filter: 'blur(0)', opacity: 1, letterSpacing: '' }], { duration: 1100, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'backwards' });
  }), { rootMargin: '0px 0px -10% 0px' });

  const scan = () => {
    if (ready) document.querySelectorAll('[data-gfolder]').forEach(build);
    document.querySelectorAll('#main h2, #work h3, #experience h3').forEach(h => { if (!done.has(h) && !reduced) { done.add(h); hio.observe(h); } });
    document.querySelectorAll('button[aria-controls^="dec-"]').forEach(b => b.classList.add('gl-btn'));
  };
  let q = false;
  new MutationObserver(() => { if (!q) { q = true; requestAnimationFrame(() => { q = false; scan(); }); } }).observe(document.documentElement, { childList: true, subtree: true });
  let ready = false;
  addEventListener('load', () => setTimeout(() => { ready = true; scan(); }, 700)); scan(); onScroll();
})();
