// Theme toggle
const root = document.documentElement;

function setTheme(theme) {
  root.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    /* ignore */
  }
}

document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    setTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });
});

// React to system preference changes only when the user hasn't chosen
const media = window.matchMedia('(prefers-color-scheme: dark)');
media.addEventListener('change', (e) => {
  let stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (err) {
    /* ignore */
  }
  if (!stored) root.classList.toggle('dark', e.matches);
});

// Mobile menu
const burger = document.querySelector('[data-burger]');
const links = document.querySelector('[data-nav-links]');
if (burger && links) {
  const close = () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  };
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

// Nav shrink on scroll
const nav = document.querySelector('[data-nav]');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
}
