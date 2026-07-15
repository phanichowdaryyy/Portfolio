/* ============================================
   Sai Chandu — Portfolio interactions
   Vanilla JS only
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- Year -------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* -------- Sticky nav on scroll -------- */
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    if (window.scrollY > 400) toTop.classList.add('visible');
    else toTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu -------- */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );

  /* -------- Back to top -------- */
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* -------- Active nav highlight (scroll spy) -------- */
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  document.querySelectorAll('.nav-link').forEach(l => {
    linkMap[l.getAttribute('href').slice(1)] = l;
  });
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        Object.values(linkMap).forEach(l => l.classList.remove('active'));
        const link = linkMap[e.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  /* -------- Reveal on scroll -------- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* -------- Counter animation -------- */
  const counters = document.querySelectorAll('.stat-num');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const duration = 1600;
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + (target >= 100 ? '+' : '+');
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + (target === 100 ? '%' : '+');
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  /* -------- Typing effect for hero name -------- */
  const typed = document.getElementById('typed');
  if (typed) {
    const words = ['Phanindhra Kumar', 'an AI Builder', 'a Problem Solver', 'Phanindhra Kumar'];
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        typed.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          return setTimeout(tick, 1800);
        }
      } else {
        typed.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 90);
    };
    setTimeout(tick, 900);
  }

  /* -------- Contact form (demo) -------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (!data.name || !data.email || !data.message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#ff6b6b';
        return;
      }
      status.style.color = '';
      status.textContent = '✓ Thank you! Your message has been sent.';
      form.reset();
      setTimeout(() => (status.textContent = ''), 5000);
    });
  }
});
