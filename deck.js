/* Selected work: scroll-dealt project deck (vanilla port of a pinned stacking-cards pattern). */
(() => {
  const deck = document.querySelector('[data-deck]');
  if (!deck) return;
  const cards = [...deck.querySelectorAll('[data-deck-card]')];
  const shades = cards.map(c => c.querySelector('[data-deck-shade]'));
  const n = cards.length;
  const still = matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)');
  const clamp01 = v => Math.min(1, Math.max(0, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const ENTER = 0.72; // share of each card's slice spent arriving
  const span = Math.max(1, n - 1);
  const arrived = (j, v) => (j <= 0 ? 1 : easeOut(clamp01((v * span - (j - 1)) / ENTER)));

  let target = 0, cur = 0, raf = 0;

  const render = v => {
    cards.forEach((card, i) => {
      let above = 0;
      for (let j = i + 1; j < n; j++) above += arrived(j, v);
      above = Math.min(3, above);
      const a = arrived(i, v);
      const y = (1 - a) * 108 - above * 5;
      const rx = -(1 - a) * 30 + above * 5;
      const s = 0.9 + 0.1 * a - above * 0.05;
      const blur = Math.pow(1 - a, 2) * 12 + above * 1.1;
      card.style.transform = `translate3d(0,${y.toFixed(2)}svh,0) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(3)})`;
      card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
      if (shades[i]) shades[i].style.opacity = (above * 0.15).toFixed(3);
    });
  };

  const clear = () => cards.forEach((c, i) => {
    c.style.transform = ''; c.style.filter = '';
    if (shades[i]) shades[i].style.opacity = '';
  });

  const measure = () => {
    const total = deck.offsetHeight - innerHeight;
    target = total > 0 ? clamp01(-deck.getBoundingClientRect().top / total) : 0;
  };

  // light smoothing: follow the wheel closely, never overshoot
  const tick = () => {
    cur += (target - cur) * 0.2;
    if (Math.abs(target - cur) < 0.0004) cur = target;
    render(cur);
    raf = cur === target ? 0 : requestAnimationFrame(tick);
  };

  const update = () => {
    if (still.matches) { clear(); return; }
    measure();
    if (!raf) raf = requestAnimationFrame(tick);
  };

  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  still.addEventListener('change', () => { cur = 0; update(); });
  measure(); cur = target; if (!still.matches) render(cur);
})();
