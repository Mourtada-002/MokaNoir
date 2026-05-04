// MOKA NOIR — main.js

document.addEventListener('DOMContentLoaded', () => {

  // Custom Cursor 
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // croll Reveal
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar-container');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.paddingTop = '16px';
    } else {
      navbar.style.paddingTop = '30px';
    }
  }, { passive: true });

  // Menu card stagger on scroll
  const menuCards = document.querySelectorAll('.menu-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(menuCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.1}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  menuCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease';
    cardObserver.observe(card);
  });

  // Process steps stagger
  const steps = document.querySelectorAll('.process-step');
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(steps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 150);
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(24px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    stepObserver.observe(step);
  });

  // CTA email input micro-interaction
  const ctaInput = document.querySelector('.cta-input');
  const ctaForm  = document.querySelector('.cta-form');

  if (ctaInput && ctaForm) {
    ctaInput.addEventListener('focus', () => {
      ctaForm.style.borderColor = 'rgba(201, 169, 110, 0.6)';
      ctaForm.style.boxShadow   = '0 0 0 3px rgba(201, 169, 110, 0.1)';
    });
    ctaInput.addEventListener('blur', () => {
      ctaForm.style.borderColor = 'rgba(201, 169, 110, 0.25)';
      ctaForm.style.boxShadow   = 'none';
    });

    document.querySelector('.cta-btn')?.addEventListener('click', () => {
      const val = ctaInput.value.trim();
      if (!val) return;
      ctaInput.value = '';
      const btn = document.querySelector('.cta-btn');
      btn.textContent = '✓ Parfait !';
      btn.style.background = '#a8c898';
      setTimeout(() => {
        btn.textContent = 'S\'abonner';
        btn.style.background = '';
      }, 2500);
    });
  }

});