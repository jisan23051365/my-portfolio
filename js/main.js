/* ============================================================
   main.js – Portfolio interactivity
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Navbar – scroll shrink + mobile menu
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('backdrop-blur-md', 'shadow-lg');
      navbar.style.background = 'rgba(15,23,42,0.95)';
    } else {
      navbar.classList.remove('backdrop-blur-md', 'shadow-lg');
      navbar.style.background = 'transparent';
    }
  });

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  /* ----------------------------------------------------------
     2. Active nav link on scroll
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ----------------------------------------------------------
     3. Intersection Observer – fade-up animations
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ----------------------------------------------------------
     4. Skill bars – animate on scroll
  ---------------------------------------------------------- */
  const skillSection = document.getElementById('skills');
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    const rect = skillSection ? skillSection.getBoundingClientRect() : null;
    if (rect && rect.top < window.innerHeight - 100) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  }

  window.addEventListener('scroll', animateSkills);
  animateSkills();

  /* ----------------------------------------------------------
     5. Typewriter effect
  ---------------------------------------------------------- */
  const typeEl = document.getElementById('typewriter');
  const phrases = [
    'Data Scientist',
    'Python Developer',
    'AI & ML Engineer',
    'Software Developer',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeLoop() {
    if (!typeEl) return;
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      typeEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIdx--;
      typeEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 100);
  }

  typeLoop();

  /* ----------------------------------------------------------
     6. Contact form – basic validation + success toast
  ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      clearFormErrors(contactForm);

      const nameEl    = contactForm.querySelector('[name="name"]');
      const emailEl   = contactForm.querySelector('[name="email"]');
      const messageEl = contactForm.querySelector('[name="message"]');

      let valid = true;

      if (!nameEl.value.trim()) {
        showFieldError(nameEl, 'Name is required.');
        valid = false;
      }
      if (!emailEl.value.trim()) {
        showFieldError(emailEl, 'Email is required.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        showFieldError(emailEl, 'Please enter a valid email address.');
        valid = false;
      }
      if (!messageEl.value.trim()) {
        showFieldError(messageEl, 'Message is required.');
        valid = false;
      }

      if (!valid) return;

      // Simulate sending (no backend in this static demo)
      showToast('Message sent! I\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  function showFieldError(input, msg) {
    input.style.borderColor = '#ef4444';
    const err = document.createElement('p');
    err.className = 'form-error text-red-400 text-xs mt-1';
    err.textContent = msg;
    input.parentNode.appendChild(err);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.contact-input').forEach(el => (el.style.borderColor = ''));
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none');
      toast.classList.remove('opacity-100');
    }, 3500);
  }

  /* ----------------------------------------------------------
     7. Back-to-top button
  ---------------------------------------------------------- */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backTop.classList.remove('opacity-0', 'pointer-events-none');
        backTop.classList.add('opacity-100');
      } else {
        backTop.classList.add('opacity-0', 'pointer-events-none');
        backTop.classList.remove('opacity-100');
      }
    });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
