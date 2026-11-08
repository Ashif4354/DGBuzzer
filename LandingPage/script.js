const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const menuBtn = document.getElementById('menuBtn');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
}

// Drag-to-scroll gallery
const g = document.getElementById('gallery');
if (g) {
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  const progress = document.querySelector('.gallery-progress span');
  const step = () => {
    const figure = g.querySelector('figure');
    return figure ? figure.getBoundingClientRect().width + parseFloat(getComputedStyle(g).gap || 0) : 240;
  };
  if (prev) prev.addEventListener('click', () => g.scrollBy({ left: -step(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => g.scrollBy({ left: step(), behavior: 'smooth' }));
  const updateProgress = () => {
    if (!progress) return;
    const maxScroll = g.scrollWidth - g.clientWidth;
    const visibleRatio = g.clientWidth / g.scrollWidth;
    const trackWidth = g.parentElement.querySelector('.gallery-progress').clientWidth;
    const thumbWidth = Math.max(trackWidth * visibleRatio, 34);
    const offset = maxScroll > 0 ? (trackWidth - thumbWidth) * (g.scrollLeft / maxScroll) : 0;
    progress.style.width = `${thumbWidth}px`;
    progress.style.transform = `translateX(${offset}px)`;
  };
  g.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
