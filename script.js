/* ===================================================
   NUTRE BIENESTAR — Script principal
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('mainNav');
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar shadow
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ---------- Back to top ----------
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Hero video toggle ----------
  const heroVideo = document.getElementById('heroVideo');
  const videoToggle = document.getElementById('videoToggle');
  const videoToggleIcon = document.getElementById('videoToggleIcon');

  if (heroVideo && videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoToggleIcon.className = 'bi bi-pause-fill';
        videoToggle.setAttribute('aria-label', 'Pausar el video de fondo');
      } else {
        heroVideo.pause();
        videoToggleIcon.className = 'bi bi-play-fill';
        videoToggle.setAttribute('aria-label', 'Reproducir el video de fondo');
      }
    });

    // Keyboard support for video toggle
    videoToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        videoToggle.click();
      }
    });

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleMotionPreference(mq) {
      if (mq.matches) {
        heroVideo.pause();
        videoToggleIcon.className = 'bi bi-play-fill';
        videoToggle.setAttribute('aria-label', 'Reproducir el video de fondo');
      }
    }

    handleMotionPreference(motionQuery);
    motionQuery.addEventListener('change', handleMotionPreference);
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Close mobile nav if open
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // ---------- Scroll reveal animations ----------
  const revealElements = document.querySelectorAll('.reveal');

  // Check if prefers-reduced-motion is set
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all elements immediately
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ---------- Stagger reveal effect for cards ----------
  const cardContainers = document.querySelectorAll('.row.g-4');
  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.reveal');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  });
});
