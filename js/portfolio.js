'use strict';
/* ==========================================================================
   SHAHIL CHOUDHARY — PORTFOLIO SCRIPT v4.0
   ✓ Theme toggle (dark/light)
   ✓ Working experience filter
   ✓ Credential vault modal
   ✓ Contact form with toast
   ✓ Navbar scroll + mobile menu
   ✓ Scroll animations
   ========================================================================== */

// ---------------------------------------------------------------------------
// VAULT DOCUMENTS CONFIG
// ---------------------------------------------------------------------------
const VAULT_DOCS = {
  resume_ai: {
    title: 'Shahil Choudhary — AI & Machine Learning Resume',
    sub:   'GenAI · LLMs · RAG Pipelines · Computer Vision · NLP · PyTorch · LangChain',
    src:   'assets/Shahil_Choudhary_AI_Resume.pdf',
    type:  'pdf',
    open:  'assets/Shahil_Choudhary_AI_Resume.pdf',
    dl:    'assets/Shahil_Choudhary_AI_Resume.pdf',
  },
  resume_backend: {
    title: 'Shahil Choudhary — Backend & Distributed Systems Resume',
    sub:   'Python · Django REST · PostgreSQL · Redis · Celery · Docker · FastAPIs · System Architecture',
    src:   'assets/Shahil_Choudhary_Backend_Resume.pdf',
    type:  'pdf',
    open:  'assets/Shahil_Choudhary_Backend_Resume.pdf',
    dl:    'assets/Shahil_Choudhary_Backend_Resume.pdf',
  },
  resume: {
    title: 'Shahil Choudhary — AI & Machine Learning Resume',
    sub:   'GenAI · LLMs · RAG Pipelines · Computer Vision · NLP · PyTorch · LangChain',
    src:   'assets/Shahil_Choudhary_AI_Resume.pdf',
    type:  'pdf',
    open:  'assets/Shahil_Choudhary_AI_Resume.pdf',
    dl:    'assets/Shahil_Choudhary_AI_Resume.pdf',
  },
  mjcorp: {
    title: 'MJCorp Asia — Offer Letter',
    sub:   'R&D Software Engineer Intern · Jul 2026',
    src:   'assets/docs/mjcorp_internship_offer.pdf',
    type:  'pdf',
    open:  'assets/docs/mjcorp_internship_offer.pdf',
    dl:    'assets/docs/mjcorp_internship_offer.pdf',
  },
  odymax: {
    title: 'Odymax Technologies — Internship Certificate',
    sub:   'Python Backend Developer Intern · Jun–Aug 2026',
    src:   'assets/docs/odymax_internship_certificate.jpg',
    type:  'img',
    open:  'assets/docs/odymax_internship_certificate.jpg',
    dl:    'assets/docs/odymax_internship_certificate.jpg',
  },
  ibm: {
    title: 'IBM Python for Data Science & AI',
    sub:   'IBM Authorized via Coursera · ID: E7GDI1CBTVUI',
    src:   'assets/docs/ibm_python_certificate.pdf',
    type:  'pdf',
    open:  'assets/docs/ibm_python_certificate.pdf',
    dl:    'assets/docs/ibm_python_certificate.pdf',
  },
  kaggle_ml: {
    title: 'Kaggle Intermediate Machine Learning',
    sub:   'Kaggle Learn Verified Certificate · Apr 2026',
    src:   'assets/docs/kaggle_intermediate_ml.jpg',
    type:  'img',
    open:  'assets/docs/kaggle_intermediate_ml.jpg',
    dl:    'assets/docs/kaggle_intermediate_ml.jpg',
  },
  kaggle_pandas: {
    title: 'Kaggle Pandas Data Wrangling',
    sub:   'Kaggle Learn Verified Certificate · Jan 2026',
    src:   'assets/docs/kaggle_pandas.jpg',
    type:  'img',
    open:  'assets/docs/kaggle_pandas.jpg',
    dl:    'assets/docs/kaggle_pandas.jpg',
  },
};

// ---------------------------------------------------------------------------
// THEME TOGGLE
// ---------------------------------------------------------------------------
function initTheme() {
  const html       = document.documentElement;
  const toggleBtn  = document.getElementById('theme-toggle');
  const iconEl     = document.getElementById('theme-icon');

  // Load saved preference
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ---------------------------------------------------------------------------
// NAVBAR
// ---------------------------------------------------------------------------
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('nav-hamburger');
  const navLinks   = document.getElementById('nav-links');
  const sections   = Array.from(document.querySelectorAll('section[id]'));
  const links      = Array.from(document.querySelectorAll('.nav-link:not(.nav-cta)'));

  // Scroll class
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------------------------
// SMOOTH ANCHOR SCROLL
// ---------------------------------------------------------------------------
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 74;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

// ---------------------------------------------------------------------------
// EXPERIENCE TRACK SWITCHER (Structured multi-track navigation)
// ---------------------------------------------------------------------------
function initExpTracks() {
  const trackBtns  = document.querySelectorAll('.exp-track-btn');
  const trackPanes = document.querySelectorAll('.exp-track-pane');

  if (!trackBtns.length || !trackPanes.length) return;

  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTrack = btn.dataset.track; // 'internship' | 'hackathon' | 'academic'

      // Update button active state & accessibility
      trackBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Switch active pane with smooth animated entrance
      trackPanes.forEach(pane => {
        if (pane.dataset.trackPane === targetTrack) {
          pane.classList.add('active');
          pane.classList.remove('pane-anim-in');
          void pane.offsetWidth; // force reflow
          pane.classList.add('pane-anim-in');
        } else {
          pane.classList.remove('active');
          pane.classList.remove('pane-anim-in');
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// VAULT MODAL
// ---------------------------------------------------------------------------
function initVaultModal() {
  const backdrop   = document.getElementById('vault-modal');
  const closeBtn   = document.getElementById('btn-close-vault');
  const titleEl    = document.getElementById('vault-doc-title');
  const subEl      = document.getElementById('vault-doc-sub');
  const openLink   = document.getElementById('btn-vault-open-link');
  const dlLink     = document.getElementById('btn-vault-download-link');
  const frameWrap  = document.getElementById('vault-frame-container');
  const tabs       = document.querySelectorAll('.vault-tab');

  let currentDoc = null;

  function loadDoc(key) {
    const doc = VAULT_DOCS[key];
    if (!doc) return;
    currentDoc = key;

    // Header
    titleEl.textContent = doc.title;
    subEl.textContent   = doc.sub;

    // Action links
    if (doc.open) {
      openLink.href = doc.open;
      openLink.target = '_blank';
      openLink.style.display = '';
    } else {
      openLink.style.display = 'none';
    }
    if (doc.dl) {
      dlLink.href = doc.dl;
      dlLink.setAttribute('download', '');
      dlLink.style.display = '';
    } else {
      dlLink.style.display = 'none';
    }

    // Content
    frameWrap.innerHTML = '';
    if (doc.type === 'html' || doc.type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src   = doc.src;
      iframe.title = doc.title;
      frameWrap.appendChild(iframe);
    } else if (doc.type === 'img') {
      const img    = document.createElement('img');
      img.src      = doc.src;
      img.alt      = doc.title;
      frameWrap.appendChild(img);
    } else if (doc.type === 'msg') {
      const wrap       = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;justify-content:center;min-height:300px;padding:40px;text-align:center;color:var(--text-secondary);font-size:1rem;line-height:1.75;';
      wrap.textContent   = doc.msg;
      frameWrap.appendChild(wrap);
    }

    // Active tab
    tabs.forEach(t => t.classList.toggle('active', t.dataset.doc === key));
  }

  function openVault(key) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadDoc(key || 'resume_ai');
  }

  function closeVault() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { frameWrap.innerHTML = ''; currentDoc = null; }, 350);
  }

  // Trigger buttons
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.btn-open-vault');
    if (trigger) openVault(trigger.dataset.doc || 'resume_ai');
  });

  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => loadDoc(tab.dataset.doc));
  });

  // Close
  closeBtn.addEventListener('click', closeVault);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeVault(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeVault();
  });
}

// ---------------------------------------------------------------------------
// GLOBAL TOAST NOTIFICATION
// ---------------------------------------------------------------------------
let toastTimer = null;
function showToast(msg, type = 'success') {
  const toast     = document.getElementById('toast');
  const toastMsg  = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastMsg) return;

  toastMsg.textContent  = msg;
  if (toastIcon) toastIcon.textContent = type === 'success' ? '✓' : '✕';
  toast.style.borderColor = type === 'success' ? 'var(--accent)' : 'var(--red)';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}

// ---------------------------------------------------------------------------
// SMART EMAIL & CONTACT LINK HANDLERS (Foolproof clipboard + compose)
// ---------------------------------------------------------------------------
function initSmartLinks() {
  // Smart Email: copies email address to clipboard + opens Gmail web compose
  document.addEventListener('click', e => {
    const emailLink = e.target.closest('.email-smart-link, a[href^="mailto:"]');
    if (!emailLink) return;

    const email = emailLink.getAttribute('data-email') || 'shahilch15@gmail.com';

    // 1. Copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`✓ Copied ${email} to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Email: ${email}`, 'success');
      });
    } else {
      showToast(`Email: ${email}`, 'success');
    }

    // 2. Open Gmail web compose in a new tab if desktop client doesn't catch it
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    setTimeout(() => {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }, 200);
  });

  // Smart Phone / WhatsApp
  document.addEventListener('click', e => {
    const phoneLink = e.target.closest('.whatsapp-smart-link, a[data-phone]');
    if (!phoneLink) return;
    const phone = phoneLink.getAttribute('data-phone') || '+918588877135';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`✓ Copied phone ${phone} to clipboard!`, 'success');
      });
    }
  });
}

// ---------------------------------------------------------------------------
// CONTACT FORM & BULLETPROOF DISPATCH ENGINE
// ---------------------------------------------------------------------------
function initContactForm() {
  const form             = document.getElementById('contact-form');
  const nameInput        = document.getElementById('contact-name');
  const emailInput       = document.getElementById('contact-email');
  const msgInput         = document.getElementById('contact-msg');
  const nameError        = document.getElementById('name-error');
  const emailError       = document.getElementById('email-error');
  const msgError         = document.getElementById('msg-error');
  const submitBtn        = document.getElementById('form-submit-btn');
  const copyDraftBtn     = document.getElementById('btn-copy-draft');

  // Dispatch Modal Elements
  const dispatchModal    = document.getElementById('dispatch-modal');
  const closeDispatchBtn = document.getElementById('btn-close-dispatch');
  const previewBox       = document.getElementById('dispatch-preview-content');
  const optGmailBtn      = document.getElementById('btn-opt-gmail');
  const optMailtoBtn     = document.getElementById('btn-opt-mailto');
  const copyPreviewBtn   = document.getElementById('btn-copy-preview-again');

  if (!form || !nameInput || !emailInput || !msgInput) return;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const RECIPIENT_EMAIL = 'shahilch15@gmail.com';

  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      setError(nameInput, nameError, 'Please enter your name.');
      return false;
    }
    if (val.length < 2) {
      setError(nameInput, nameError, 'Name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      setError(emailInput, emailError, 'Please enter your email address.');
      return false;
    }
    if (!EMAIL_REGEX.test(val)) {
      setError(emailInput, emailError, 'Please enter a valid email (e.g. name@company.com).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateMsg() {
    const val = msgInput.value.trim();
    if (!val) {
      setError(msgInput, msgError, 'Please write your message.');
      return false;
    }
    if (val.length < 5) {
      setError(msgInput, msgError, 'Message must be at least 5 characters.');
      return false;
    }
    clearError(msgInput, msgError);
    return true;
  }

  function setError(input, errorEl, msg) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    }
  }

  function clearError(input, errorEl) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }

  // Live input cleanup
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('is-invalid')) validateName();
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) validateEmail();
  });
  msgInput.addEventListener('input', () => {
    if (msgInput.classList.contains('is-invalid')) validateMsg();
  });

  // Blur validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  msgInput.addEventListener('blur', validateMsg);

  function getDraftData() {
    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg   = msgInput.value.trim();

    const subject = `Portfolio Inquiry — ${name || 'Collaboration'}`;
    const body = `Hi Shahil,

${msg}

Best regards,
${name}
Email: ${email}`;

    const fullDraft = `To: ${RECIPIENT_EMAIL}
From: ${name} <${email}>
Subject: ${subject}

Hi Shahil,

${msg}

Best regards,
${name}
Email: ${email}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return { name, email, msg, subject, body, fullDraft, gmailUrl, mailtoUrl };
  }

  function copyToClipboard(text, successToastMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successToastMsg || '✓ Draft copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopyText(text, successToastMsg);
      });
    } else {
      fallbackCopyText(text, successToastMsg);
    }
  }

  function fallbackCopyText(text, successToastMsg) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(successToastMsg || '✓ Draft copied to clipboard!', 'success');
    } catch (e) {
      showToast('Draft ready in modal below', 'success');
    }
  }

  function openDispatchModal(data) {
    if (!dispatchModal) return;
    if (previewBox) previewBox.textContent = data.fullDraft;
    if (optGmailBtn) optGmailBtn.href = data.gmailUrl;
    if (optMailtoBtn) optMailtoBtn.href = data.mailtoUrl;

    dispatchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDispatchModal() {
    if (!dispatchModal) return;
    dispatchModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeDispatchBtn) closeDispatchBtn.addEventListener('click', closeDispatchModal);
  if (dispatchModal) {
    dispatchModal.addEventListener('click', e => {
      if (e.target === dispatchModal) closeDispatchModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dispatchModal && dispatchModal.classList.contains('open')) {
      closeDispatchModal();
    }
  });

  if (copyPreviewBtn) {
    copyPreviewBtn.addEventListener('click', () => {
      const data = getDraftData();
      copyToClipboard(data.fullDraft, '✓ Copied formatted email draft!');
    });
  }

  if (optGmailBtn) {
    optGmailBtn.addEventListener('click', () => {
      showToast('Opening Gmail Web compose in new tab...', 'success');
    });
  }

  if (optMailtoBtn) {
    optMailtoBtn.addEventListener('click', () => {
      showToast('Opening default mail client...', 'success');
    });
  }

  // Copy Draft button on the form
  if (copyDraftBtn) {
    copyDraftBtn.addEventListener('click', () => {
      const isNameOk = validateName();
      const isEmailOk = validateEmail();
      const isMsgOk = validateMsg();

      if (!isNameOk || !isEmailOk || !isMsgOk) {
        showToast('Please fill in your details to generate draft', 'error');
        return;
      }

      const data = getDraftData();
      copyToClipboard(data.fullDraft, '✓ Draft copied to clipboard!');
      openDispatchModal(data);
    });
  }

  // Main Form Submit handler — Pop-up modal appears first!
  form.addEventListener('submit', e => {
    e.preventDefault();

    const isNameOk  = validateName();
    const isEmailOk = validateEmail();
    const isMsgOk   = validateMsg();

    if (!isNameOk || !isEmailOk || !isMsgOk) {
      if (!isNameOk) nameInput.focus();
      else if (!isEmailOk) emailInput.focus();
      else if (!isMsgOk) msgInput.focus();
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    const data = getDraftData();

    // 1. Copy formatted draft to clipboard immediately
    copyToClipboard(data.fullDraft, `✓ Draft copied! Ready for ${data.name}`);

    // 2. Pop up the modal first (user can review and click Gmail Web or Mail app)
    openDispatchModal(data);
  });
}

// ---------------------------------------------------------------------------
// HERO NEURAL / CONSTELLATION CANVAS
// ---------------------------------------------------------------------------
function initHeroCanvas() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animId = null;
  let isRunning = true;
  const mouse = { x: null, y: null, maxDist: 140 };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  const numParticles = Math.min(42, Math.max(22, Math.floor((window.innerWidth * 38) / 1200)));
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 600),
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 1.8 + 1.2,
    });
  }

  function getThemeColor(alpha) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return isDark ? `rgba(99, 102, 241, ${alpha})` : `rgba(79, 70, 229, ${alpha})`;
  }

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

      // Particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = getThemeColor(0.55);
      ctx.fill();

      // Mouse interactive line
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = getThemeColor((1 - dist / mouse.maxDist) * 0.42);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connecting lines between neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 105) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = getThemeColor((1 - dist / 105) * 0.2);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(render);
  }

  // Auto-pause when scrolled out of view to save battery/GPU
  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver(([entry]) => {
      isRunning = entry.isIntersecting;
      if (isRunning && !animId) render();
      else if (!isRunning && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  render();
}

// ---------------------------------------------------------------------------
// TYPEWRITER EFFECT
// ---------------------------------------------------------------------------
function initTypewriter() {
  const el = document.getElementById('typewriter-word');
  if (!el) return;

  const words = [
    'Full-Stack AI Apps',
    'Scalable Django Backends',
    'LangChain & RAG Pipelines',
    'Distributed Cloud Systems',
    'Award-Winning Web Tech'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function type() {
    const currentWord = words[wordIndex % words.length];

    if (isDeleting) {
      charIndex--;
      typingSpeed = 40;
    } else {
      charIndex++;
      typingSpeed = 85;
    }

    el.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause on completed word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      typingSpeed = 380; // Brief pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ---------------------------------------------------------------------------
// ANIMATED COUNTERS
// ---------------------------------------------------------------------------
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = (ease * target).toFixed(decimals);
      el.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target.toFixed(decimals)}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

// ---------------------------------------------------------------------------
// SKILL PROFICIENCY BARS
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// SKILL PROFICIENCY BARS (Deprecated in favor of rich engineering tech chips)
// ---------------------------------------------------------------------------
function initSkillBars() {
  // Rich capability tech chips with real-world project verification replaced meters
}

// ---------------------------------------------------------------------------
// SKILL DOMAINS DATASET (INTERACTIVE POPUP MODAL DATA)
// ---------------------------------------------------------------------------
const SKILL_DOMAINS = {
  '01': {
    id: '01',
    tag: 'DOMAIN // 01',
    title: 'Full-Stack Dev',
    sub: 'Building end-to-end web applications with modern architectures.',
    iconBoxClass: 'scc-ib-pink',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>`,
    skills: [
      {
        name: 'React.js',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Component architecture, custom hooks, Context API, state management, memoization & high-performance virtual DOM rendering.',
        projects: ['Mentra.AI', 'RouteIQ', 'Interactive Portfolio']
      },
      {
        name: 'Next.js',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'App Router, Server-Side Rendering (SSR), Static Site Generation (SSG), Edge API endpoints & search engine optimization.',
        projects: ['Mentra.AI', 'Modern Web Apps']
      },
      {
        name: 'Node.js & Express.js',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Asynchronous event loop, middleware pipelines, REST API microservices, streaming endpoints & robust error handlers.',
        projects: ['Mentra.AI Backend', 'RouteIQ Proxy Engine']
      },
      {
        name: 'TypeScript & Modern JavaScript',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'Strict type systems, interfaces, async/await pipelines, ESNext module patterns & resilient frontend codebase structure.',
        projects: ['Production Web Applications']
      },
      {
        name: 'Java (Core & OOP)',
        badge: 'Core Competency',
        badgeClass: 'smd-core',
        desc: 'Object-Oriented Design, data structures & algorithms, concurrency, multithreading & foundational enterprise backend patterns.',
        projects: ['Academic Distinctions', 'System Benchmarks']
      },
      {
        name: 'HTML5 & Modern CSS3 / Glassmorphism',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Responsive CSS Grid & Flexbox, CSS Custom Properties, smooth micro-interactions, dark/bright mode theming & accessible markup.',
        projects: ['Portfolio v4.2', 'Production Frontends']
      }
    ]
  },
  '02': {
    id: '02',
    tag: 'DOMAIN // 02',
    title: 'Databases & Data',
    sub: 'Designing efficient schemas, indexing strategies & high-throughput data systems.',
    iconBoxClass: 'scc-ib-cyan',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>`,
    skills: [
      {
        name: 'PostgreSQL',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Relational data modeling, ACID transactions, complex JOIN queries, composite indexing, foreign keys & performance optimization.',
        projects: ['WorkFlowX', 'MJCorp Earn By Way', 'Odymax']
      },
      {
        name: 'MongoDB',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Document schema design, Aggregation Framework, Mongoose ODM schemas, replica sets & high-speed nested document queries.',
        projects: ['Mentra.AI Platform']
      },
      {
        name: 'Supabase',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'PostgreSQL-as-a-service, Row-Level Security (RLS) policies, Realtime websockets, automated migrations & cloud auth integration.',
        projects: ['Distributed Cloud Workflows']
      },
      {
        name: 'Redis',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'In-memory caching, sub-millisecond key-value lookups, user session caching, rate limiter counters & Celery broker transport.',
        projects: ['WorkFlowX High-Throughput API']
      },
      {
        name: 'Database Architecture & Normalization',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: '3NF normalization, query execution plan analysis (EXPLAIN ANALYZE), connection pooling & database migration scripts.',
        projects: ['Enterprise Escrow Schemas']
      }
    ]
  },
  '03': {
    id: '03',
    tag: 'DOMAIN // 03',
    title: 'Backend & APIs',
    sub: 'Scalable APIs, microservices, asynchronous task queues & resilient business logic.',
    iconBoxClass: 'scc-ib-purple',
    iconSvg: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>`,
    skills: [
      {
        name: 'Django & Django REST Framework (DRF)',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Production API architecture, serializers, custom permissions, viewsets, authentication backends, signals & Django ORM.',
        projects: ['WorkFlowX', 'Earn By Way (MJCorp)']
      },
      {
        name: 'RESTful API Engineering',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Strict HTTP response semantics, OpenAPI/Swagger specifications, payload validation, token authentication & idempotency.',
        projects: ['Mentra.AI', 'RouteIQ', 'WorkFlowX']
      },
      {
        name: 'Celery & Background Workers',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Distributed asynchronous task queues, periodic cron tasks with Celery Beat, dead-letter retries & decoupled job processing.',
        projects: ['WorkFlowX Async Pipeline']
      },
      {
        name: 'Microservices & Event-Driven Flows',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'Decoupled services, webhook listeners, asynchronous event dispatching, health check monitors & graceful shutdowns.',
        projects: ['Distributed Systems Architecture']
      },
      {
        name: 'Python System Engineering',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Advanced Python idioms, decorators, generators, typing protocols, context managers, multiprocessing & automated testing.',
        projects: ['IBM Verified Data Science', 'All Backends']
      }
    ]
  },
  '04': {
    id: '04',
    tag: 'DOMAIN // 04',
    title: 'AI Integrations',
    sub: 'LLMs, RAG pipelines, semantic search & intelligent autonomous agents.',
    iconBoxClass: 'scc-ib-magenta',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path>
    </svg>`,
    skills: [
      {
        name: 'Google Gemini API',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Multimodal reasoning, structured schema output (JSON mode), token management, system instructions & low-latency streaming.',
        projects: ['Mentra.AI Career Intelligence']
      },
      {
        name: 'OpenAI API & Models',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'GPT-4o integrations, tool calling / function calling, fine-tuned agent prompts & dynamic context injection.',
        projects: ['Smart Code & Career Assist']
      },
      {
        name: 'LangChain & RAG Architectures',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Retrieval-Augmented Generation pipelines, text chunking strategies, contextual re-ranking & hallucination reduction techniques.',
        projects: ['Mentra.AI Skill-Gap Engine']
      },
      {
        name: 'Vector Databases & Embeddings',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'ChromaDB, Pinecone, cosine similarity search, high-dimensional vector embeddings & semantic retrieval indexing.',
        projects: ['Mentra.AI Knowledge Base']
      },
      {
        name: 'Prompt Engineering & Agent Loops',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Chain-of-Thought (CoT) prompting, ReAct agent architectures, structured output enforcement & safety guards.',
        projects: ['Autonomous Career Roadmaps']
      }
    ]
  },
  '05': {
    id: '05',
    tag: 'DOMAIN // 05',
    title: 'Dev Tools & Cloud',
    sub: 'Development tooling, containerization, deployment pipelines & collaborative workflows.',
    iconBoxClass: 'scc-ib-teal',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>`,
    skills: [
      {
        name: 'Git & GitHub',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Feature branching, interactive rebasing, merge conflict resolution, pull request code reviews & semantic commit standards.',
        projects: ['All GitHub Repositories (@Latiyan15)']
      },
      {
        name: 'Docker & Containerization',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Multi-stage builds, docker-compose orchestration for web + db + redis + celery, environment isolation & lightweight containers.',
        projects: ['WorkFlowX Container Stack']
      },
      {
        name: 'Vercel Deployment & Edge',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Automated CI/CD git hooks, edge functions, environment secret governance, custom domain SSL & preview staging URLs.',
        projects: ['Mentra.AI', 'RouteIQ', 'Live Portfolio']
      },
      {
        name: 'Render & Cloud Platforms',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Hosting production web services, managed PostgreSQL databases, background worker dynos & continuous deploy triggers.',
        projects: ['WorkFlowX Cloud API', 'Backend Demos']
      },
      {
        name: 'Postman & Linux CLI',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Automated API integration test suites, mock servers, environment variables, bash automation & Ubuntu server administration.',
        projects: ['Odymax Technologies', 'Daily Engineering']
      }
    ]
  },
  '06': {
    id: '06',
    tag: 'DOMAIN // 06',
    title: 'Security & Auth',
    sub: 'Implementing secure, audited, and resilient system architectures.',
    iconBoxClass: 'scc-ib-violet',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`,
    skills: [
      {
        name: 'JWT & RBAC (Role-Based Access Control)',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'JSON Web Token rotation, cryptographic signature validation, short-lived access tokens, refresh tokens & hierarchical permissions.',
        projects: ['WorkFlowX', 'Earn By Way Platform']
      },
      {
        name: 'API Security & CORS Policies',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Strict CORS origin whitelisting, HTTP Security Headers (HSTS, CSP, X-Frame-Options), payload sanitization & request validation.',
        projects: ['All Production Backends']
      },
      {
        name: 'Redis Rate Limiting',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Sliding window & token bucket rate limiters, IP and user-level throttling, brute-force mitigation & DoS protection.',
        projects: ['WorkFlowX High-Traffic API']
      },
      {
        name: 'OWASP Top 10 Safeguards',
        badge: 'Advanced',
        badgeClass: 'smd-adv',
        desc: 'Prevention of SQL Injection, Cross-Site Scripting (XSS), CSRF tokens, secure cookie flags (HttpOnly, SameSite) & input sanitization.',
        projects: ['MJCorp Escrow Engine']
      },
      {
        name: 'Financial Escrow Protection Architecture',
        badge: 'Production Ready',
        badgeClass: 'smd-prod',
        desc: 'Multi-stage payment verification, milestone fund locking, automated release conditions & dispute mitigation audit logs.',
        projects: ['Earn By Way (MJCorp Asia)']
      }
    ]
  }
};

// ---------------------------------------------------------------------------
// SKILL CARDS & POPUP MODAL CONTROLLER
// ---------------------------------------------------------------------------
function initSkillCardsAndModal() {
  const modal = document.getElementById('skill-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('btn-close-skill-modal');
  const viewAllBtn = document.getElementById('btn-view-all-skills');
  const indexTag = document.getElementById('sm-index-tag');
  const domainTitle = document.getElementById('sm-domain-title');
  const domainSub = document.getElementById('sm-domain-sub');
  const iconContainer = document.getElementById('sm-icon-container');
  const tabsContainer = document.getElementById('sm-domain-tabs');
  const bodyWrap = document.getElementById('sm-body-wrap');
  const cards = document.querySelectorAll('.skill-card-cyber[data-skill-id]');

  function renderDomain(domainId) {
    const data = SKILL_DOMAINS[domainId];
    if (!data) return;

    if (indexTag) indexTag.textContent = data.tag;
    if (domainTitle) domainTitle.textContent = data.title;
    if (domainSub) domainSub.textContent = data.sub;

    if (iconContainer) {
      iconContainer.className = `sm-icon-container ${data.iconBoxClass}`;
      iconContainer.innerHTML = data.iconSvg;
    }

    // Update active tab inside modal
    if (tabsContainer) {
      tabsContainer.querySelectorAll('.sm-tab').forEach(tab => {
        const isActive = tab.dataset.tabDomain === domainId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
    }

    // Render detailed skill cards
    if (bodyWrap) {
      bodyWrap.innerHTML = data.skills.map(s => `
        <div class="smd-item">
          <div class="smd-top">
            <span class="smd-name">${s.name}</span>
            <span class="smd-badge ${s.badgeClass}">${s.badge}</span>
          </div>
          <p class="smd-desc">${s.desc}</p>
          <div class="smd-proof">
            <span class="smd-proof-label">Verified in:</span>
            ${s.projects.map(p => `<span class="smd-proof-tag">${p}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  function openModal(domainId = '01') {
    renderDomain(domainId);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind clicks and enter keys on all 6 cyber cards
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.dataset.skillId || '01';
      openModal(id);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.dataset.skillId || '01';
        openModal(id);
      }
    });
  });

  // View All Skills button
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('01');
    });
  }

  // Quick domain switch tabs inside the modal
  if (tabsContainer) {
    tabsContainer.querySelectorAll('.sm-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const domainId = tab.dataset.tabDomain;
        if (domainId) renderDomain(domainId);
      });
    });
  }

  // Close triggers: close button, backdrop click, Escape key
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}


// ---------------------------------------------------------------------------
// 3D TILT & CARD SPOTLIGHT
// ---------------------------------------------------------------------------
function init3DTiltAndSpotlight() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.project-card, .skill-category, .exp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

// ---------------------------------------------------------------------------
// AMBIENT CURSOR GLOW
// ---------------------------------------------------------------------------
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function follow() {
    posX += (mouseX - posX) * 0.12;
    posY += (mouseY - posY) * 0.12;
    glow.style.left = `${posX}px`;
    glow.style.top = `${posY}px`;
    requestAnimationFrame(follow);
  }
  follow();
}

// ---------------------------------------------------------------------------
// BACK TO TOP & SCROLL PROGRESS BARS
// ---------------------------------------------------------------------------
function initBackToTopAndProgress() {
  const bttBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('progress-circle');
  const progressBar = document.getElementById('scroll-progress-bar');
  const circumference = 119.38; // 2 * Math.PI * 19

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    // Top horizontal reading bar
    if (progressBar) {
      progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Circular button progress ring
    if (progressCircle) {
      const offset = circumference - progress * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    // Show/hide floating button
    if (bttBtn) {
      bttBtn.classList.toggle('visible', scrollY > 320);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ---------------------------------------------------------------------------
// SCROLL ENTRANCE ANIMATIONS
// ---------------------------------------------------------------------------
function initScrollAnimations() {
  const selectors = [
    '.project-card',
    '.skills-cyber-header',
    '.skill-card-cyber',
    '.skill-category',
    '.exp-card',
    '.about-img-col',
    '.about-text-col',
    '.contact-info-card',
    '.contact-form',
    '.section-header',
    '.quick-stat',
    '.stat-bar-item',
    '.hero-badge',
    '.hero-title',
    '.hero-desc',
    '.hero-tags',
    '.hero-actions',
    '.hero-socials',
    '.hero-avatar-wrap',
    '.learning-banner',
    '.skills-filter-bar',
  ];

  const elements = document.querySelectorAll(selectors.join(','));
  elements.forEach(el => el.classList.add('fade-up'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), (idx % 6) * 65);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => io.observe(el));
}

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initSmoothScroll();
  initSmartLinks();
  initExpTracks();
  initVaultModal();
  initContactForm();
  initHeroCanvas();
  initTypewriter();
  initCounters();
  initSkillBars();
  initSkillCardsAndModal();
  init3DTiltAndSpotlight();
  initCursorGlow();
  initBackToTopAndProgress();
  initScrollAnimations();
});
