const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const progress = document.getElementById('scrollProgress');

menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('open', !open);
});

document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 0;
  progress.style.width = `${pct}%`;
};
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
