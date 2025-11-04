// script.js — Interações: menu, parallax, reveal (IntersectionObserver), form simulado

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const burger = document.querySelector('.btn-burger');
  const nav = document.querySelector('.nav');
  burger?.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', (!expanded).toString());
    if (!expanded) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '60px';
      nav.style.background = 'rgba(6,6,6,0.9)';
      nav.style.padding = '0.8rem';
      nav.style.borderRadius = '8px';
    } else {
      nav.style.display = '';
      nav.style.position = '';
      nav.style.right = '';
      nav.style.top = '';
      nav.style.background = '';
      nav.style.padding = '';
      nav.style.borderRadius = '';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu if open
        if (window.innerWidth < 900 && nav && burger) {
          nav.style.display = '';
          burger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Parallax effect (simple and performant)
  const parallax = document.querySelector('.hero-bg');
  if (parallax) {
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      // move background slower than scroll
      parallax.style.transform = `translateY(${sc * 0.15}px) scale(1.02)`;
    }, { passive: true });
  }

  // Reveal on scroll using IntersectionObserver
  const obsOptions = { threshold: 0.12 };
  const revealElems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // animate skill bars when visible
        const bar = entry.target.querySelector('.bar span');
        if (bar) {
          const w = getComputedStyle(bar).getPropertyValue('--w') || bar.getAttribute('data-w') || '80%';
          // set transform scale using percent
          const percent = parseFloat(w);
          bar.style.transform = `scaleX(${(percent || 80) / 100})`;
        }
        obs.unobserve(entry.target);
      }
    });
  }, obsOptions);
  revealElems.forEach(el => observer.observe(el));

  // Contact form (simulado)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form) return;
    formMsg.textContent = '';
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Por favor, preencha todos os campos.';
      return;
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(email)) {
      formMsg.textContent = 'Informe um email válido.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simula envio (substitua por integração real)
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
      formMsg.textContent = 'Mensagem enviada! Responderei em breve. (envio simulado)';
    }, 1100);
  });

  // Accessibility: close menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      if (nav) nav.style.display = '';
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  });

});


const carousel = document.querySelector('.projects-carousel');
const cards = document.querySelectorAll('.project-card');

let scrollAmount = 0;
const cardWidth = cards[0].offsetWidth + 16; // card + gap
const scrollSpeed = 2500; // tempo entre rolagens (ms)

function autoScroll() {
  scrollAmount += cardWidth;
  
  if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount = 0; // volta pro início
  }

  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// roda automaticamente
setInterval(autoScroll, scrollSpeed);
