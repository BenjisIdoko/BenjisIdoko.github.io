/* Colour theme: follows the system until a choice is saved, then keeps that choice. */
(() => {
  const KEY = 'bie-theme', root = document.documentElement;
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const saved = () => { try { const t = localStorage.getItem(KEY); return t === 'dark' || t === 'light' ? t : null; } catch (e) { return null; } };
  const apply = t => {
    root.dataset.theme = t;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim() || (t === 'dark' ? '#111214' : '#F4F2EC'));
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      b.setAttribute('aria-pressed', String(t === 'dark'));
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  };
  apply(root.dataset.theme || saved() || (mq.matches ? 'dark' : 'light'));
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-theme-toggle]'); if (!b) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (err) {}
    apply(next);
  });
  mq.addEventListener('change', e => { if (!saved()) apply(e.matches ? 'dark' : 'light'); });
})();
