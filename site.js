/* Benjamin Emmanuel portfolio: page interactions in plain JavaScript (no framework). */
(() => {
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  const menu = document.querySelector('[data-if="menu"]');
  const menuBtn = document.querySelector('[data-action="menu-toggle"]');
  const setMenu = open => {
    if (!menu) return;
    menu.hidden = !open;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open && menuBtn && menu.contains(document.activeElement)) menuBtn.focus();
  };
  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  $$('[data-action="menu-close"]').forEach(el => el.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false); });
  matchMedia('(max-width: 760px)').addEventListener('change', e => { if (!e.matches) setMenu(false); });

  /* Work filters */
  const groups = { all: ['cng', 'pf', 'unitora', 'nj', 'hr'], client: ['pf', 'unitora', 'nj', 'hr'], own: ['cng'] };
  const chips = $$('[data-filter]');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach(c => {
      const on = c === chip;
      c.setAttribute('aria-pressed', String(on));
      c.style.background = on ? '#16171A' : 'transparent';
      c.style.color = on ? '#F4F2EC' : '#16171A';
    });
    $$('[data-show]').forEach(el => { el.hidden = !groups[f].includes(el.dataset.show); });
  }));

  /* Key decisions: open and close */
  $$('[data-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.toggle;
    const panel = document.querySelector(`[data-if="open-${id}"]`);
    if (!panel) return;
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    const sign = btn.querySelector('[data-sign]');
    if (sign) sign.textContent = open ? '\u2212' : '+';
  }));

  /* Toolkit: stacked cards */
  const picks = $$('[data-pick]');
  const cards = picks.filter(el => el.tagName !== 'BUTTON');
  const tabs = picks.filter(el => el.tagName === 'BUTTON');
  const pick = a => {
    const others = [0, 1, 2].filter(i => i !== a);
    cards.forEach(card => {
      const i = +card.dataset.pick, front = i === a, left = i === others[0];
      card.style.zIndex = front ? 4 : left ? 1 : 2;
      card.style.transform = front ? 'translate(0,0) rotate(0deg) scale(1)'
        : left ? 'translate(-24%,40px) rotate(-7deg) scale(.92)' : 'translate(24%,40px) rotate(7deg) scale(.92)';
      card.style.cursor = front ? 'default' : 'pointer';
      card.setAttribute('aria-hidden', String(!front));
      const tag = card.querySelector(':scope > span');
      if (tag) { tag.style.left = front || left ? '22px' : 'auto'; tag.style.right = front || left ? 'auto' : '22px'; }
    });
    tabs.forEach(t => {
      const on = +t.dataset.pick === a;
      t.setAttribute('aria-pressed', String(on));
      t.style.borderColor = on ? '#16171A' : '#DDD8CD';
      t.style.background = on ? '#fff' : 'transparent';
    });
  };
  picks.forEach(el => el.addEventListener('click', () => pick(+el.dataset.pick)));

  /* Portrait: measurement frame on hover */
  const portrait = document.querySelector('[data-portrait]');
  const frame = document.querySelector('[data-sel]');
  const dims = document.querySelector('[data-dims]');
  if (portrait && frame) {
    portrait.addEventListener('mouseenter', () => {
      frame.style.opacity = 1;
      if (dims) dims.textContent = portrait.offsetWidth + ' \u00d7 ' + portrait.offsetHeight;
    });
    portrait.addEventListener('mouseleave', () => { frame.style.opacity = 0; });
  }

  /* Copy email, with a stamped confirmation */
  const copyBtn = document.querySelector('[data-action="copy-email"]');
  const stampHost = document.querySelector('[data-stamp]');
  let stampTimer;
  if (copyBtn) copyBtn.addEventListener('click', () => {
    const email = 'benjaminemma360@gmail.com';
    const done = () => {
      if (!stampHost) return;
      stampHost.querySelectorAll('.stamp').forEach(s => s.remove());
      const s = document.createElement('span');
      s.className = 'stamp';
      s.setAttribute('role', 'status');
      s.style.cssText = "position:absolute;left:50%;top:-30px;margin-left:-58px;width:116px;box-sizing:border-box;pointer-events:none;text-align:center;font-family:'Spline Sans Mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;color:#8FA6E8;border:2px solid #8FA6E8;border-radius:6px;padding:4px 6px;line-height:1.2;background:#16171A;" + (reduced ? '' : 'animation:stampIn 2.2s cubic-bezier(.2,.8,.3,1) forwards');
      const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      s.innerHTML = '<b style="display:block;font-size:15px;font-weight:500">Copied</b><span style="font-size:9px;letter-spacing:.08em">' + date + '</span>';
      stampHost.appendChild(s);
      clearTimeout(stampTimer);
      stampTimer = setTimeout(() => s.remove(), 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done, () => { location.href = 'mailto:' + email; });
    else location.href = 'mailto:' + email;
  });
})();
