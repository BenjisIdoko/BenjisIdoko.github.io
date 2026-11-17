/* Selected work: project details dialogs and grid filter state. */
(() => {
  const grid = document.querySelector('.wk-grid');
  document.querySelectorAll('[data-open-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dlg = document.getElementById(btn.dataset.openDialog);
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    });
  });
  document.querySelectorAll('dialog.wk-dialog').forEach(dlg => {
    // a click on the backdrop lands on the dialog element itself
    // only when the press also began on the backdrop (not a text selection dragged out)
    let downOnBackdrop = false;
    dlg.addEventListener('pointerdown', e => { downOnBackdrop = e.target === dlg; });
    dlg.addEventListener('click', e => { if (e.target === dlg && downOnBackdrop) dlg.close(); });
    dlg.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dlg.close()));
  });
  // let the featured layout know which filter is active
  document.querySelectorAll('[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => { if (grid) grid.dataset.view = chip.dataset.filter; });
  });
})();
