
// ============================================
// PORTAFOLIO HWR - FUNCIONES PRINCIPALES
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// MENÚ DE NAVEGACIÓN
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute(
      'aria-label',
      open ? 'Cerrar menú' : 'Abrir menú'
    );
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// AÑO AUTOMÁTICO DEL PIE DE PÁGINA
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// BARRA DE PROGRESO DE LECTURA
const progress = document.getElementById('progress');

function updateProgress() {
  if (!progress) return;

  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = max > 0
    ? (window.scrollY / max) * 100
    : 0;

  progress.style.width = percentage + '%';
}

window.addEventListener('scroll', updateProgress, {
  passive: true
});

updateProgress();

// ANIMACIONES DE APARICIÓN
// Si el navegador no admite IntersectionObserver,
// el contenido permanece visible.

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('visible');
  });
}

