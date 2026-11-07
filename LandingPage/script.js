const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');
const menuBtn = document.getElementById('menuBtn');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
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
  let down = false, startX = 0, startLeft = 0;
  g.addEventListener('mousedown', e => { down = true; startX = e.pageX; startLeft = g.scrollLeft; g.style.scrollSnapType = 'none'; });
  window.addEventListener('mouseup', () => { down = false; g.style.scrollSnapType = ''; });
  g.addEventListener('mousemove', e => { if (down) g.scrollLeft = startLeft - (e.pageX - startX); });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
