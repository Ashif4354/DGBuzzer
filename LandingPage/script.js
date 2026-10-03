const nav = document.getElementById('nav');
const navLinks = document.getElementById('navLinks');

document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Drag-to-scroll gallery
const g = document.getElementById('gallery');
let down = false, startX = 0, startLeft = 0;
g.addEventListener('mousedown', e => { down = true; startX = e.pageX; startLeft = g.scrollLeft; g.style.scrollSnapType = 'none'; });
window.addEventListener('mouseup', () => { down = false; g.style.scrollSnapType = ''; });
g.addEventListener('mousemove', e => { if (down) g.scrollLeft = startLeft - (e.pageX - startX); });

document.getElementById('year').textContent = new Date().getFullYear();
