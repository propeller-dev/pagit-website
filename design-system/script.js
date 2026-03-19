// ============================================================
// PAGIT DESIGN SYSTEM — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVIGATION ──
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.ds-section');
  const breadcrumb = document.getElementById('breadcrumb-text');

  const labels = {
    colors: 'Cores',
    typography: 'Tipografia',
    spacing: 'Espaçamento',
    radius: 'Border Radius',
    shadows: 'Sombras',
    buttons: 'Botões',
    inputs: 'Inputs & Formulários',
    badges: 'Badges & Tags',
    cards: 'Cards',
    alerts: 'Alertas & Feedback',
    motion: 'Motion & Animações',
    icons: 'Tokens CSS'
  };

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const target = document.getElementById(id);
    const nav = document.querySelector(`[data-section="${id}"]`);

    if (target) target.classList.add('active');
    if (nav) nav.classList.add('active');
    if (breadcrumb) breadcrumb.textContent = labels[id] || id;
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.getAttribute('data-section');
      showSection(id);
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // ── MOBILE MENU TOGGLE ──
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          !sidebar.contains(e.target) &&
          e.target !== menuToggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ── COLOR COPY ──
  const copyToast = document.getElementById('copyToast');

  function showToast(msg) {
    copyToast.textContent = msg;
    copyToast.classList.add('show');
    setTimeout(() => copyToast.classList.remove('show'), 1800);
  }

  function addCopyToColors() {
    // Color swatches
    document.querySelectorAll('.color-swatch, .scale-item').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const hex = el.getAttribute('data-hex');
        if (hex) {
          navigator.clipboard.writeText(hex).then(() => {
            showToast(`✓ ${hex} copiado!`);
          }).catch(() => {
            showToast(`✓ ${hex}`);
          });
        }
      });
    });
  }

  addCopyToColors();

  // ── COPY TOKENS ──
  const copyTokensBtn = document.getElementById('copyTokens');
  const tokensCode = document.getElementById('tokensCode');

  if (copyTokensBtn && tokensCode) {
    copyTokensBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(tokensCode.textContent).then(() => {
        copyTokensBtn.textContent = '✓ Copiado!';
        setTimeout(() => { copyTokensBtn.textContent = '📋 Copiar todos os tokens'; }, 2000);
      });
    });
  }

  // ── INPUT LIVE PREVIEW ──
  document.querySelectorAll('.input').forEach(el => {
    el.addEventListener('focus', () => {
      el.parentElement.querySelectorAll('.input').forEach(i => i.classList.add('focused'));
    });
    el.addEventListener('blur', () => {
      el.parentElement.querySelectorAll('.input').forEach(i => i.classList.remove('focused'));
    });
  });

  // ── SMOOTH SECTION HIGHLIGHTING (scroll fallback) ──
  // Intersection observer for active nav on hash scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(n => n.classList.remove('active'));
        const nav = document.querySelector(`[data-section="${id}"]`);
        if (nav) nav.classList.add('active');
        if (breadcrumb) breadcrumb.textContent = labels[id] || id;
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));

  // ── TOKEN SYNTAX HIGHLIGHTING (simple) ──
  if (tokensCode) {
    let html = tokensCode.textContent
      .replace(/\/\*.*?\*\//g, m => `<span style="color:#6272A4">${m}</span>`)
      .replace(/(--[\w-]+)/g, `<span style="color:#8BE9FD">$1</span>`)
      .replace(/(#[0-9A-Fa-f]{3,8})/g, (m) => {
        return `<span style="color:${m};background:rgba(255,255,255,0.15);padding:0 3px;border-radius:3px">${m}</span>`;
      })
      .replace(/(:[\s]+)/g, `<span style="color:#FF79C6">$1</span>`)
      .replace(/(rem|px|ms)/g, `<span style="color:#FFB86C">$1</span>`);

    tokensCode.innerHTML = html;
  }

  // ── PARALLAX SECTION LABEL ──
  labels['parallax'] = 'Parallax & Scroll';
  labels['personas'] = 'Humanização & Personas';

  // ── INITIALIZE ──
  showSection('colors');

  // ── SCROLL-DRIVEN DEMO fallback (IntersectionObserver para browsers sem CSS scroll-driven) ──
  const sdDemo = document.querySelector('.scroll-driven-demo');
  if (sdDemo) {
    const sdCards = sdDemo.querySelectorAll('.sd-card');
    const fill    = sdDemo.querySelector('.sd-progress-fill');

    // Fallback reveal via IntersectionObserver dentro do scroll container
    const sdObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('sd-visible');
      });
    }, { root: sdDemo, threshold: 0.3 });

    sdCards.forEach(c => sdObserver.observe(c));

    // Progress bar do scroll —replica do detect-scroll do Stripe
    sdDemo.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = sdDemo;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      if (fill) fill.style.width = pct + '%';
    }, { passive: true });
  }

  // ── SCROLL REVEAL (IntersectionObserver) — Padrão Neofin/Abacate ──
  function initReveal() {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealIO.unobserve(e.target);   // fire once
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealIO.observe(el));
    return revealIO;
  }

  let revealObserver = initReveal();

  // Função global de reset (chamada pelo botão no HTML)
  window.resetReveal = function () {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.remove('visible');
    });
    if (revealObserver) revealObserver.disconnect();
    // Re-observar após breve delay para animação ser visível
    setTimeout(() => { revealObserver = initReveal(); }, 50);
  };

  // ── PARALLAX DE CAMADAS — Mouse + fallback touch ──
  const phHero  = document.getElementById('parallaxHero');
  if (phHero) {
    const layers = phHero.querySelectorAll('.ph-layer');
    let ticking  = false;
    let targetX  = 0, targetY  = 0;
    let currentX = 0, currentY = 0;

    // Lerp suave para os blobs (não linear, mais orgânico)
    function lerp(a, b, t) { return a + (b - a) * t; }

    function animateLayers() {
      currentX = lerp(currentX, targetX, 0.07);
      currentY = lerp(currentY, targetY, 0.07);

      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed) || 0;
        layer.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
      });

      requestAnimationFrame(animateLayers);
    }

    animateLayers();

    // Mouse
    phHero.addEventListener('mousemove', (e) => {
      const rect = phHero.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width  / 2) * 0.5;
      targetY = (e.clientY - rect.top  - rect.height / 2) * 0.5;
    }, { passive: true });

    phHero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    // Touch / gyroscope fallback
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (phHero.closest('.ds-section.active')) {
          targetX = (e.gamma || 0) * 1.5;  // tilt left/right
          targetY = (e.beta  || 0) * 0.8;  // tilt front/back
        }
      }, { passive: true });
    }
  }

});
