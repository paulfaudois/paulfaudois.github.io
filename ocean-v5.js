/* Portfolio E5 — accessible theme switch, image viewer and progress indicator. */
(() => {
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll('.theme-toggle'));
  function setTheme(theme, save = false) {
    const night = theme === 'night';
    root.dataset.theme = night ? 'night' : 'day';
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(night));
      button.setAttribute('aria-label', night ? 'Activer le mode jour' : 'Activer le mode nuit');
      button.title = night ? 'Revenir au mode jour' : 'Passer en mode nuit';
      const icon = button.querySelector('.theme-toggle-symbol');
      const label = button.querySelector('.theme-toggle-label');
      if (icon) icon.textContent = night ? '☀' : '☾';
      if (label) label.textContent = night ? 'Jour' : 'Nuit';
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = night ? '#071b27' : '#073a4c';
    if (save) {
      try { localStorage.setItem('paul-portfolio-theme', night ? 'night' : 'day'); } catch (_) {}
    }
  }
  setTheme(root.dataset.theme || 'day');
  buttons.forEach(b => b.addEventListener('click', () => setTheme(root.dataset.theme === 'night' ? 'day' : 'night', true)));

  // Images remain ordinary links if <dialog> is not supported.
  const dialog = document.querySelector('.gallery-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('.dialog-media img');
    const title = dialog.querySelector('.dialog-title');
    const caption = dialog.querySelector('.dialog-description');
    const close = dialog.querySelector('.dialog-close');
    document.querySelectorAll('a.evidence-card').forEach(card => {
      card.addEventListener('click', e => {
        e.preventDefault();
        image.src = card.getAttribute('href');
        image.alt = card.querySelector('img')?.alt || card.dataset.title || '';
        title.textContent = card.dataset.title || 'Extrait du rapport';
        caption.textContent = card.dataset.caption || '';
        dialog.showModal();
        close?.focus();
      });
    });
    close?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { image.removeAttribute('src'); });
  }

  // A light reading progress marker, never an animated scroll hijack.
  const progress = document.querySelector('.reading-progress');
  let busy = false;
  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? Math.min(100, 100 * window.scrollY / max) : 0) + '%';
    busy = false;
  }
  window.addEventListener('scroll', () => {
    if (busy) return;
    busy = true;
    window.requestAnimationFrame(updateProgress);
  }, {passive: true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();
