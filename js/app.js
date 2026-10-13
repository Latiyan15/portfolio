// Cinematic Fighting-Game & Arcade Portfolio Controller
// Complete game state machine, audio triggers, keyboard handling, and micro-interactions

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // Projects Data (Boss Fights)
  // --------------------------------------------------------------------------
  const PROJECTS_DATA = {
    mentra: {
      id: 'mentra',
      title: 'Mentra.AI',
      subtitle: 'AI Career Intelligence Platform',
      category: 'AI / Web',
      bossName: 'CAREER UNCERTAINTY',
      playerName: 'MENTRA.AI',
      objective: 'Eliminate career anxiety by equipping students with dynamic skill roadmaps and AI mentorship.',
      description: 'An AI-powered career platform that analyzes a user’s current capabilities against target market roles to generate personalized roadmaps, actionable learning missions, and live interview preparation workflows.',
      features: [
        'Multi-step skill gap analysis and automated career milestone roadmap generation.',
        'Node.js/Express backend integrated with MongoDB and RAG pipelines for verified, hallucination-free career intelligence.',
        'LangChain AI agent orchestration chaining Gemini and OpenAI models for real-time interview simulations.'
      ],
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini', 'OpenAI', 'LangChain', 'RAG', 'Vector DB'],
      image: 'assets/images/stage_mentra_ai.jpg',
      liveUrl: 'https://aimentra-three.vercel.app/',
      githubUrl: 'https://github.com/Latiyan15/Mentra.AI'
    },
    routeiq: {
      id: 'routeiq',
      title: 'RouteIQ',
      subtitle: 'AI-Powered Transit Planner',
      category: 'Transit / AI',
      bossName: 'TRANSIT GRIDLOCK',
      playerName: 'ROUTEIQ',
      objective: 'Eliminate commute unpredictability through real-time transit telemetry and intelligent routing.',
      description: 'A cutting-edge public transit planner that integrates GTFS data with real-time transit feeds to deliver ultra-accurate multi-modal route planning, alternative route suggestions, and live bus telemetry.',
      features: [
        'Live transit telemetry with Server-Sent Events (SSE) for journey monitoring and delay broadcast alerts.',
        'Interactive mapping engine built on Leaflet and OpenStreetMap with live vehicle coordinates.',
        'Gemini-powered travel recommendations providing contextual commute advice based on weather and traffic conditions.'
      ],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Leaflet', 'OpenStreetMap', 'GTFS', 'Gemini'],
      image: 'assets/images/stage_routeiq.jpg',
      liveUrl: 'https://route-iq-delta.vercel.app',
      githubUrl: 'https://github.com/Latiyan15/RouteIQ'
    },
    workflowx: {
      id: 'workflowx',
      title: 'WorkFlowX',
      subtitle: 'Enterprise Project Management Backend',
      category: 'Backend / Architecture',
      bossName: 'SCALABILITY BOTTLENECK',
      playerName: 'WORKFLOWX',
      objective: 'Crush latency and data integrity issues with an enterprise relational backend architecture.',
      description: 'A robust, high-performance relational backend architecture powering organizational workflows (User → Organization → Project → Board → Task → Comment) with stringent security and background job processing.',
      features: [
        'Django ORM database architecture with transactional migrations, role-based authorization, and JWT authentication.',
        'Asynchronous task workers using Celery and Redis caching for real-time notifications and webhooks.',
        'Complete Swagger/OpenAPI documentation, test coverage, and Dockerized deployment pipelines on Render & Railway.'
      ],
      techStack: ['Django', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Celery', 'JWT', 'Docker', 'Swagger/OpenAPI'],
      image: 'assets/images/stage_workflowx.jpg',
      liveUrl: 'https://github.com/Latiyan15/WorkFlowX',
      githubUrl: 'https://github.com/Latiyan15/WorkFlowX'
    },
    earnbyway: {
      id: 'earnbyway',
      title: 'Earn By Way',
      subtitle: 'AI Escrow Freelance Marketplace',
      category: 'Escrow / AI',
      bossName: 'FREELANCE TRUST DEFICIT',
      playerName: 'EARN BY WAY',
      objective: 'Safeguard freelancer milestones and corporate deliverables with AI-backed escrow governance.',
      description: 'Built during my R&D internship at MJCORP ASIA PVT LTD, Earn By Way connects verified enterprise talent with businesses via an automated escrow protection framework and intelligent project matching.',
      features: [
        'End-to-end secure escrow payment workflows guarding financial milestones for both parties.',
        'AI-driven matching algorithm pairing niche technical requirements with verified developer credentials.',
        'Dispute reduction workflow using audit trails and automated delivery verification metrics.'
      ],
      techStack: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'Escrow Security', 'AI Matching', 'Docker'],
      image: 'assets/images/stage_marketplace.jpg',
      liveUrl: 'https://github.com/Latiyan15?tab=repositories',
      githubUrl: 'https://github.com/Latiyan15?tab=repositories'
    }
  };

  // --------------------------------------------------------------------------
  // State Machine & Screen Navigation
  // --------------------------------------------------------------------------
  let currentScreen = 'landing';
  const screens = {
    'landing': document.getElementById('landing-screen'),
    'char-select': document.getElementById('char-select-screen'),
    'main-menu': document.getElementById('main-menu-screen'),
    'projects': document.getElementById('projects-screen'),
    'skills': document.getElementById('skills-screen'),
    'experience': document.getElementById('experience-screen'),
    'about': document.getElementById('about-screen'),
    'contact': document.getElementById('contact-screen')
  };

  const hudNavButtons = document.querySelectorAll('.hud-nav-btn');

  function switchScreen(targetScreenId) {
    if (!screens[targetScreenId]) return;

    // Play select sound
    if (window.arcadeAudio) {
      window.arcadeAudio.playSelect();
    }

    // Hide current screen
    if (screens[currentScreen]) {
      screens[currentScreen].classList.remove('active');
    }

    // Show target screen
    currentScreen = targetScreenId;
    screens[currentScreen].classList.add('active');
    
    // Guaranteed instant top scroll to completely eliminate blank black screen
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Update HUD nav active state
    hudNavButtons.forEach(btn => {
      if (btn.dataset.target === targetScreenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Footer Navigation Shortcuts
  document.querySelectorAll('.btn-footer-shortcut').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      if (target) switchScreen(target);
    });
  });

  // HUD Navigation Clicks
  hudNavButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      switchScreen(target);
    });
    btn.addEventListener('mouseenter', () => {
      if (window.arcadeAudio) window.arcadeAudio.playHover();
    });
  });

  // Generic Sound Effect Hooks for Buttons & Links
  document.querySelectorAll('button, a, .menu-card, .stage-card, .skill-node, .roster-slot').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.arcadeAudio) window.arcadeAudio.playHover();
    });
  });

  // --------------------------------------------------------------------------
  // Screen 1: Press Start
  // --------------------------------------------------------------------------
  const pressStartBtn = document.getElementById('btn-press-start');
  if (pressStartBtn) {
    pressStartBtn.addEventListener('click', () => {
      switchScreen('char-select');
    });
  }

  // --------------------------------------------------------------------------
  // Screen 2: Character Select (Developer Combat Archetypes)
  // --------------------------------------------------------------------------
  const DEVELOPER_ARCHETYPES = {
    fullstack: {
      id: 'fullstack',
      role: 'PLAYER 01 // FULL-STACK ARCHITECT',
      classBadge: 'CLASS: SYSTEM ARCHITECT / BUILDER',
      quote: '"Turning ideas into scalable, real-world reality with end-to-end engineering."',
      borderColor: 'var(--neon-pink)',
      shadowColor: 'rgba(255, 42, 109, 0.45)',
      weapons: ['React.js', 'Django REST', 'PostgreSQL', 'Docker', 'REST APIs'],
      stats: [
        { label: 'CODE ARCHITECTURE', value: 95, color: 'linear-gradient(90deg, #ff2a6d, #ff0055)' },
        { label: 'SYSTEM LOGIC & APIS', value: 92, color: 'linear-gradient(90deg, #05d9e8, #00b4d8)' },
        { label: 'PROBLEM SOLVING & AI/ML', value: 90, color: 'linear-gradient(90deg, #ffb800, #ff6b35)' },
        { label: 'CREATIVE INTUITION', value: 88, color: 'linear-gradient(90deg, #c084fc, #a855f7)' },
        { label: 'COFFEE & PERSISTENCE', value: 98, color: 'linear-gradient(90deg, #ff6b35, #ef4444)' }
      ]
    },
    ai: {
      id: 'ai',
      role: 'PLAYER 01 // AI & LLM SYSTEMS SPECIALIST',
      classBadge: 'CLASS: INTELLIGENCE ENGINEER / RAG SPECIALIST',
      quote: '"Engineering hallucination-free reasoning engines, vector pipelines, and autonomous agents."',
      borderColor: 'var(--neon-cyan)',
      shadowColor: 'rgba(5, 217, 232, 0.55)',
      weapons: ['LangChain', 'RAG Pipelines', 'Vector DBs', 'Gemini API', 'OpenAI API', 'Python'],
      stats: [
        { label: 'AI & PROMPT ORCHESTRATION', value: 96, color: 'linear-gradient(90deg, #05d9e8, #3b82f6)' },
        { label: 'RAG & VECTOR SEARCH', value: 94, color: 'linear-gradient(90deg, #05d9e8, #00ff88)' },
        { label: 'AGENTIC WORKFLOWS', value: 92, color: 'linear-gradient(90deg, #c084fc, #05d9e8)' },
        { label: 'DATA PROCESSING & PYTHON', value: 95, color: 'linear-gradient(90deg, #ffb800, #05d9e8)' },
        { label: 'PERSISTENCE & ITERATION', value: 97, color: 'linear-gradient(90deg, #ff2a6d, #05d9e8)' }
      ]
    },
    backend: {
      id: 'backend',
      role: 'PLAYER 01 // HIGH-PERFORMANCE BACKEND TANK',
      classBadge: 'CLASS: RELIABILITY ARCHITECT / ENGINE TANK',
      quote: '"Bulletproof relational data integrity, zero latency, and resilient async task queues."',
      borderColor: 'var(--neon-gold)',
      shadowColor: 'rgba(255, 184, 0, 0.55)',
      weapons: ['Python', 'Django ORM', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
      stats: [
        { label: 'RELATIONAL DB & ORM DESIGN', value: 96, color: 'linear-gradient(90deg, #ffb800, #ff6b35)' },
        { label: 'ASYNC PROCESSING (CELERY)', value: 93, color: 'linear-gradient(90deg, #ffb800, #eab308)' },
        { label: 'API SECURITY & JWT AUTH', value: 94, color: 'linear-gradient(90deg, #00ff88, #10b981)' },
        { label: 'SWAGGER & DOC INTEGRITY', value: 95, color: 'linear-gradient(90deg, #05d9e8, #ffb800)' },
        { label: 'UPTIME & PERSISTENCE', value: 99, color: 'linear-gradient(90deg, #ff2a6d, #ffb800)' }
      ]
    },
    security: {
      id: 'security',
      role: 'PLAYER 01 // ESCROW & SECURITY SPECIALIST',
      classBadge: 'CLASS: TRANSACTION GUARDIAN / CONTRACT LOGIC',
      quote: '"Milestone-verified escrow flows guarding business deliverables and trust protocols."',
      borderColor: 'var(--neon-green)',
      shadowColor: 'rgba(0, 255, 136, 0.5)',
      weapons: ['Escrow Logic', 'Audit Trails', 'Dispute Reduction', 'Milestone Releases', 'JWT Auth'],
      stats: [
        { label: 'TRANSACTION & ESCROW ARCHITECTURE', value: 95, color: 'linear-gradient(90deg, #00ff88, #05d9e8)' },
        { label: 'DISPUTE RESOLUTION PROTOCOLS', value: 92, color: 'linear-gradient(90deg, #00ff88, #10b981)' },
        { label: 'ENTERPRISE TALENT VERIFICATION', value: 91, color: 'linear-gradient(90deg, #ffb800, #00ff88)' },
        { label: 'API INTEGRATION RIGOR', value: 94, color: 'linear-gradient(90deg, #05d9e8, #00ff88)' },
        { label: 'AUDIT LOG PERSISTENCE', value: 96, color: 'linear-gradient(90deg, #ff2a6d, #00ff88)' }
      ]
    }
  };

  const confirmCharBtn = document.getElementById('btn-confirm-char');
  if (confirmCharBtn) {
    confirmCharBtn.addEventListener('click', () => {
      switchScreen('main-menu');
    });
  }

  const backToStartBtn = document.getElementById('btn-char-back');
  if (backToStartBtn) {
    backToStartBtn.addEventListener('click', () => {
      if (window.arcadeAudio) window.arcadeAudio.playBack();
      switchScreen('landing');
    });
  }

  const charMainCard = document.getElementById('char-main-card');
  const charRoleDisplay = document.getElementById('char-role-display');
  const charClassBadge = document.getElementById('char-class-badge');
  const charBioQuote = document.getElementById('char-bio-quote');
  const charWeaponsList = document.getElementById('char-weapons-list');
  const statBarsContainer = document.getElementById('stat-bars-container');
  const archetypeButtons = document.querySelectorAll('.roster-archetype-item');

  function selectArchetype(archetypeKey) {
    const spec = DEVELOPER_ARCHETYPES[archetypeKey];
    if (!spec) return;

    // Update active button state
    archetypeButtons.forEach(btn => {
      if (btn.dataset.archetype === archetypeKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update profile card visuals
    if (charRoleDisplay) charRoleDisplay.textContent = spec.role;
    if (charClassBadge) charClassBadge.textContent = spec.classBadge;
    if (charBioQuote) charBioQuote.textContent = spec.quote;

    if (charMainCard) {
      charMainCard.style.borderColor = spec.borderColor;
      charMainCard.style.boxShadow = `0 0 30px ${spec.shadowColor}`;
    }

    // Update weapons
    if (charWeaponsList) {
      charWeaponsList.innerHTML = '';
      spec.weapons.forEach(w => {
        const pill = document.createElement('span');
        pill.className = 'weapon-pill';
        pill.textContent = w;
        charWeaponsList.appendChild(pill);
      });
    }

    // Update stat bars with smooth animation
    if (statBarsContainer) {
      statBarsContainer.innerHTML = '';
      spec.stats.forEach(stat => {
        const row = document.createElement('div');
        row.className = 'stat-row';
        row.innerHTML = `
          <div class="stat-label-wrap">
            <span>${stat.label}</span>
            <span>${stat.value} / 100</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width: 0%; background: ${stat.color}; transition: width 0.4s ease;"></div>
          </div>
        `;
        statBarsContainer.appendChild(row);

        // Trigger animation
        requestAnimationFrame(() => {
          setTimeout(() => {
            const fill = row.querySelector('.stat-bar-fill');
            if (fill) fill.style.width = `${stat.value}%`;
          }, 30);
        });
      });
    }
  }

  // Bind archetype buttons
  archetypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.archetype;
      selectArchetype(key);
      if (window.arcadeAudio) window.arcadeAudio.playSelect();
    });
  });

  // Initialize with default archetype
  selectArchetype('fullstack');

  // --------------------------------------------------------------------------
  // Screen 7: Experience Categorized Arena Filters
  // --------------------------------------------------------------------------
  const careerFilterBtns = document.querySelectorAll('.career-filter-btn');
  const arenaSectorBlocks = document.querySelectorAll('.arena-sector-block');

  careerFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      careerFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      arenaSectorBlocks.forEach(block => {
        if (filter === 'all' || block.dataset.sector === filter) {
          block.classList.remove('hidden');
        } else {
          block.classList.add('hidden');
        }
      });

      if (window.arcadeAudio) window.arcadeAudio.playSelect();
    });
  });

  // --------------------------------------------------------------------------
  // Screen 3: Main Menu Card Clicks
  // --------------------------------------------------------------------------
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.target;
      if (target) {
        switchScreen(target);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Back Buttons from Stages to Main Menu
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn-back-to-menu').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.arcadeAudio) window.arcadeAudio.playBack();
      switchScreen('main-menu');
    });
  });

  // --------------------------------------------------------------------------
  // Screen 4: Projects (Stage Select) -> Boss Fight Modal
  // --------------------------------------------------------------------------
  const bossModal = document.getElementById('boss-fight-modal');
  const closeModalBtn = document.getElementById('btn-close-boss-modal');
  const bossArenaBg = document.getElementById('boss-modal-bg');
  const bossStageTitle = document.getElementById('boss-modal-title');
  const bossStageSub = document.getElementById('boss-modal-sub');
  const bossNameDisplay = document.getElementById('boss-name-display');
  const playerNameDisplay = document.getElementById('player-name-display');
  const bossObjectiveText = document.getElementById('boss-objective-text');
  const bossDescText = document.getElementById('boss-desc-text');
  const bossFeaturesList = document.getElementById('boss-features-list');
  const bossTechStack = document.getElementById('boss-tech-stack');
  const bossLiveBtn = document.getElementById('boss-live-btn');
  const bossGithubBtn = document.getElementById('boss-github-btn');
  const bossHpFill = document.getElementById('boss-hp-fill');
  const attackBossBtn = document.getElementById('btn-attack-boss');
  const comboDamagePop = document.getElementById('combo-damage-pop');
  const expandArtBtn = document.getElementById('btn-expand-artwork');
  const artLightboxModal = document.getElementById('art-lightbox-modal');
  const artLightboxImg = document.getElementById('art-lightbox-img');
  const artLightboxTitle = document.getElementById('art-lightbox-title');
  const closeArtLightboxBtn = document.getElementById('btn-close-art-lightbox');

  let currentBossHp = 100;
  let comboCount = 0;

  function openBossModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    currentBossHp = 100;
    comboCount = 0;
    bossHpFill.style.width = '100%';
    comboDamagePop.classList.remove('animate');
    attackBossBtn.innerHTML = '⚔ ATTACK WITH SOLUTION';
    attackBossBtn.style.background = '';

    bossArenaBg.src = data.image;
    bossStageTitle.textContent = data.title;
    bossStageSub.textContent = `STAGE ENCOUNTER // ${data.category}`;
    bossNameDisplay.textContent = `BOSS: ${data.bossName}`;
    playerNameDisplay.textContent = `PLAYER: ${data.playerName}`;
    bossObjectiveText.textContent = data.objective;
    bossDescText.textContent = data.description;

    // Features
    bossFeaturesList.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      bossFeaturesList.appendChild(li);
    });

    // Tech Stack
    bossTechStack.innerHTML = '';
    data.techStack.forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'tech-chip';
      chip.textContent = t;
      bossTechStack.appendChild(chip);
    });

    // Links Setup & Dynamic Labels
    bossLiveBtn.href = data.liveUrl;
    bossLiveBtn.setAttribute('href', data.liveUrl);
    bossLiveBtn.setAttribute('target', '_blank');
    bossLiveBtn.setAttribute('rel', 'noopener noreferrer');

    bossGithubBtn.href = data.githubUrl;
    bossGithubBtn.setAttribute('href', data.githubUrl);
    bossGithubBtn.setAttribute('target', '_blank');
    bossGithubBtn.setAttribute('rel', 'noopener noreferrer');

    if (data.liveUrl.includes('vercel.app')) {
      bossLiveBtn.innerHTML = '🚀 LAUNCH LIVE VERCEL APP';
    } else {
      bossLiveBtn.innerHTML = '🚀 VIEW REPOSITORY ARCHITECTURE';
    }
    bossGithubBtn.innerHTML = '🐙 GITHUB SOURCE CODE';

    bossModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Guaranteed top scroll so arena image is never squashed or hidden
    const modalWindow = bossModal.querySelector('.boss-modal-window');
    if (modalWindow) {
      modalWindow.scrollTop = 0;
    }

    // Boss siren audio
    if (window.arcadeAudio) {
      window.arcadeAudio.playBossAlert();
    }
  }

  // Reliable Project Link Handlers
  if (bossLiveBtn) {
    bossLiveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = bossLiveBtn.getAttribute('href');
      if (url && url !== '#' && !url.startsWith('javascript:')) {
        window.open(url, '_blank', 'noopener,noreferrer');
        e.preventDefault();
      }
    });
  }

  if (bossGithubBtn) {
    bossGithubBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = bossGithubBtn.getAttribute('href');
      if (url && url !== '#' && !url.startsWith('javascript:')) {
        window.open(url, '_blank', 'noopener,noreferrer');
        e.preventDefault();
      }
    });
  }

  // AI Artwork Fullscreen Lightbox Handlers
  if (expandArtBtn) {
    expandArtBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (artLightboxModal && artLightboxImg && bossArenaBg) {
        artLightboxImg.src = bossArenaBg.src;
        if (artLightboxTitle) artLightboxTitle.textContent = `${bossStageTitle.textContent} // BATTLEGROUND AI ARTWORK (FULL HD)`;
        artLightboxModal.classList.add('active');
        if (window.arcadeAudio) window.arcadeAudio.playSelect();
      }
    });
  }

  if (closeArtLightboxBtn) {
    closeArtLightboxBtn.addEventListener('click', () => {
      if (artLightboxModal) artLightboxModal.classList.remove('active');
      if (window.arcadeAudio) window.arcadeAudio.playBack();
    });
  }

  if (artLightboxModal) {
    artLightboxModal.addEventListener('click', (e) => {
      if (e.target === artLightboxModal) {
        artLightboxModal.classList.remove('active');
        if (window.arcadeAudio) window.arcadeAudio.playBack();
      }
    });
  }

  // Quick Copy Email Button
  const quickCopyEmailBtn = document.getElementById('btn-quick-copy-email');
  if (quickCopyEmailBtn) {
    quickCopyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('shahilch15@gmail.com').then(() => {
        const originalText = quickCopyEmailBtn.innerHTML;
        quickCopyEmailBtn.innerHTML = '✅ EMAIL COPIED!';
        if (window.arcadeAudio) window.arcadeAudio.playVictory();
        setTimeout(() => {
          quickCopyEmailBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }

  function closeBossModal() {
    bossModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (window.arcadeAudio) {
      window.arcadeAudio.playBack();
    }
  }

  document.querySelectorAll('.stage-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if user clicked a direct card link
      if (e.target.closest('.stage-card-direct-links')) return;
      const projId = card.dataset.project;
      openBossModal(projId);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBossModal);
  }

  bossModal.addEventListener('click', (e) => {
    if (e.target === bossModal) {
      closeBossModal();
    }
  });

  // Boss Attack Mechanic
  if (attackBossBtn) {
    attackBossBtn.addEventListener('click', () => {
      if (currentBossHp <= 0) {
        if (window.arcadeAudio) window.arcadeAudio.playVictory();
        return;
      }

      comboCount++;
      currentBossHp = Math.max(0, currentBossHp - 35);
      bossHpFill.style.width = `${currentBossHp}%`;

      // Shake window
      bossModal.querySelector('.boss-modal-window').classList.add('screen-shake');
      setTimeout(() => {
        bossModal.querySelector('.boss-modal-window').classList.remove('screen-shake');
      }, 300);

      // Sound
      if (window.arcadeAudio) {
        window.arcadeAudio.playHit();
      }

      // Combo pop
      comboDamagePop.textContent = `COMBO x${comboCount} // -${comboCount * 450} DMG!`;
      comboDamagePop.classList.add('animate');
      setTimeout(() => {
        comboDamagePop.classList.remove('animate');
      }, 600);

      if (currentBossHp <= 0) {
        attackBossBtn.innerHTML = '🏆 BOSS DEFEATED!';
        attackBossBtn.style.background = 'linear-gradient(135deg, #00ff88, #05d9e8)';
        if (window.arcadeAudio) {
          window.arcadeAudio.playVictory();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Keyboard Navigation
  // --------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    // ESC closes modal or goes back to main menu
    if (e.key === 'Escape') {
      if (bossModal.classList.contains('active')) {
        closeBossModal();
      } else if (currentScreen !== 'main-menu' && currentScreen !== 'landing') {
        switchScreen('main-menu');
      }
    }

    // ENTER / Space triggers primary CTA
    if (e.key === 'Enter') {
      if (currentScreen === 'landing') {
        switchScreen('char-select');
      } else if (currentScreen === 'char-select') {
        switchScreen('main-menu');
      }
    }

    // Number keys 1-5 jump to stages
    if (!bossModal.classList.contains('active') && !e.target.matches('input, textarea')) {
      if (e.key === '1') switchScreen('projects');
      if (e.key === '2') switchScreen('skills');
      if (e.key === '3') switchScreen('experience');
      if (e.key === '4') switchScreen('about');
      if (e.key === '5') switchScreen('contact');
    }
  });

  // --------------------------------------------------------------------------
  // CRT Scanlines & Sound Toggles
  // --------------------------------------------------------------------------
  const crtOverlay = document.querySelector('.crt-overlay');
  const btnToggleCrt = document.getElementById('btn-toggle-crt');
  if (btnToggleCrt && crtOverlay) {
    btnToggleCrt.addEventListener('click', () => {
      crtOverlay.classList.toggle('disabled');
      const isOff = crtOverlay.classList.contains('disabled');
      btnToggleCrt.innerHTML = isOff ? '📺 CRT: OFF' : '📺 CRT: ON';
      if (window.arcadeAudio) window.arcadeAudio.playSelect();
    });
  }

  const btnToggleSfx = document.getElementById('btn-toggle-sfx');
  if (btnToggleSfx && window.arcadeAudio) {
    btnToggleSfx.innerHTML = window.arcadeAudio.isMuted() ? '🔇 SFX: OFF' : '🔊 SFX: ON';
    btnToggleSfx.addEventListener('click', () => {
      const isMuted = window.arcadeAudio.toggleMute();
      btnToggleSfx.innerHTML = isMuted ? '🔇 SFX: OFF' : '🔊 SFX: ON';
      if (!isMuted) window.arcadeAudio.playSelect();
    });
  }

  // --------------------------------------------------------------------------
  // Credential & Document Vault Data (Real PDFs & Certificates)
  // --------------------------------------------------------------------------
  const DOCUMENTS_DATA = {
    resume: {
      title: 'SHAHIL CHOUDHARY — OFFICIAL ATS RESUME',
      subtitle: 'B.Tech CSE (GGSIPU, 8.6 CGPA) // Full-Stack & AI Systems',
      type: 'html',
      src: 'resume.html',
      downloadUrl: 'resume.html',
      newTabUrl: 'resume.html'
    },
    mjcorp: {
      title: 'MJCORP ASIA PVT LTD — INTERNSHIP OFFER LETTER',
      subtitle: '3-Month R&D Remote Internship // Earn By Way Escrow Project',
      type: 'pdf',
      src: 'assets/docs/mjcorp_internship_offer.pdf',
      downloadUrl: 'assets/docs/mjcorp_internship_offer.pdf',
      newTabUrl: 'assets/docs/mjcorp_internship_offer.pdf'
    },
    odymax: {
      title: 'ODYMAX TECHNOLOGIES — INTERNSHIP CERTIFICATE',
      subtitle: 'Python Backend Developer Intern // Jun 15 - Aug 15, 2026',
      type: 'image',
      src: 'assets/docs/odymax_internship_certificate.jpg',
      downloadUrl: 'assets/docs/odymax_internship_certificate.jpg',
      newTabUrl: 'assets/docs/odymax_internship_certificate.jpg'
    },
    ibm: {
      title: 'IBM & COURSERA — PYTHON FOR DATA SCIENCE & AI',
      subtitle: 'Authorized by IBM // Online Verification ID: E7GDI1CBTVUI',
      type: 'pdf',
      src: 'assets/docs/ibm_python_certificate.pdf',
      downloadUrl: 'assets/docs/ibm_python_certificate.pdf',
      newTabUrl: 'https://coursera.org/verify/E7GDI1CBTVUI'
    },
    kaggle_ml: {
      title: 'KAGGLE — INTERMEDIATE MACHINE LEARNING',
      subtitle: 'Kaggle Learn Verified Certificate // Completed April 29, 2026',
      type: 'image',
      src: 'assets/docs/kaggle_intermediate_ml.jpg',
      downloadUrl: 'assets/docs/kaggle_intermediate_ml.jpg',
      newTabUrl: 'assets/docs/kaggle_intermediate_ml.jpg'
    },
    kaggle_pandas: {
      title: 'KAGGLE — PANDAS CERTIFICATE OF COMPLETION',
      subtitle: 'Kaggle Learn Verified Certificate // Completed January 13, 2026',
      type: 'image',
      src: 'assets/docs/kaggle_pandas.jpg',
      downloadUrl: 'assets/docs/kaggle_pandas.jpg',
      newTabUrl: 'assets/docs/kaggle_pandas.jpg'
    }
  };

  const vaultModal = document.getElementById('vault-modal');
  const closeVaultBtn = document.getElementById('btn-close-vault');
  const vaultDocTitle = document.getElementById('vault-doc-title');
  const vaultDocSub = document.getElementById('vault-doc-sub');
  const vaultOpenLink = document.getElementById('btn-vault-open-link');
  const vaultDownloadLink = document.getElementById('btn-vault-download-link');
  const vaultContainer = document.getElementById('vault-frame-container');
  const vaultTabs = document.querySelectorAll('.vault-tab-btn');

  function showVaultDocument(docKey) {
    const doc = DOCUMENTS_DATA[docKey];
    if (!doc) return;

    if (window.arcadeAudio) window.arcadeAudio.playSelect();

    // Update active tab
    vaultTabs.forEach(tab => {
      if (tab.dataset.doc === docKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    vaultDocTitle.textContent = doc.title;
    vaultDocSub.textContent = doc.subtitle;
    vaultOpenLink.href = doc.newTabUrl;
    vaultDownloadLink.href = doc.downloadUrl;
    vaultDownloadLink.setAttribute('download', doc.downloadUrl.split('/').pop());

    // Render container content
    vaultContainer.innerHTML = '';

    if (doc.type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.className = 'vault-pdf-frame';
      iframe.src = doc.src;
      vaultContainer.appendChild(iframe);
    } else if (doc.type === 'image') {
      const img = document.createElement('img');
      img.className = 'vault-cert-image';
      img.src = doc.src;
      img.alt = doc.title;
      vaultContainer.appendChild(img);
    } else if (doc.type === 'html') {
      const iframe = document.createElement('iframe');
      iframe.className = 'vault-pdf-frame';
      iframe.src = doc.src;
      vaultContainer.appendChild(iframe);
    }
  }

  function openCredentialVault(initialDoc = 'resume') {
    if (!vaultModal) return;
    vaultModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showVaultDocument(initialDoc);
  }

  function closeCredentialVault() {
    if (!vaultModal) return;
    vaultModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (window.arcadeAudio) window.arcadeAudio.playBack();
  }

  // Vault Tab Clicks
  vaultTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showVaultDocument(tab.dataset.doc);
    });
  });

  // Vault Trigger Buttons
  document.querySelectorAll('.btn-open-vault').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const doc = btn.dataset.doc || 'resume';
      openCredentialVault(doc);
    });
  });

  if (closeVaultBtn) {
    closeVaultBtn.addEventListener('click', closeCredentialVault);
  }

  if (vaultModal) {
    vaultModal.addEventListener('click', (e) => {
      if (e.target === vaultModal) {
        closeCredentialVault();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Email Dispatch Modal & Real Webmail Submission Integration
  // --------------------------------------------------------------------------
  const emailDispatchModal = document.getElementById('email-dispatch-modal');
  const closeDispatchBtn = document.getElementById('btn-close-dispatch-modal');
  const modalCopyBtn = document.getElementById('btn-dispatch-copy-modal');
  const modalCopyFeedback = document.getElementById('dispatch-copy-feedback');

  function openEmailDispatchModal() {
    if (!emailDispatchModal) return;
    emailDispatchModal.classList.add('active');
    if (window.arcadeAudio) window.arcadeAudio.playSelect();
  }

  function closeEmailDispatchModal() {
    if (!emailDispatchModal) return;
    emailDispatchModal.classList.remove('active');
    if (window.arcadeAudio) window.arcadeAudio.playBack();
  }

  document.querySelectorAll('.btn-open-dispatch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openEmailDispatchModal();
    });
  });

  if (closeDispatchBtn) {
    closeDispatchBtn.addEventListener('click', closeEmailDispatchModal);
  }

  if (emailDispatchModal) {
    emailDispatchModal.addEventListener('click', (e) => {
      if (e.target === emailDispatchModal) {
        closeEmailDispatchModal();
      }
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('shahilch15@gmail.com').then(() => {
        if (modalCopyFeedback) {
          modalCopyFeedback.textContent = '✅ EMAIL COPIED TO CLIPBOARD (shahilch15@gmail.com)';
          setTimeout(() => {
            modalCopyFeedback.textContent = '';
          }, 3000);
        }
        if (window.arcadeAudio) window.arcadeAudio.playVictory();
      });
    });
  }

  // Contact Form Submission: Automatically Compose in Gmail + Copy Message + Show Victory
  const contactForm = document.getElementById('contact-form');
  const victoryModal = document.getElementById('victory-modal');
  const closeVictoryBtn = document.getElementById('btn-close-victory');

  if (contactForm && victoryModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-msg');

      const name = nameInput ? nameInput.value.trim() : 'Recruiter / Collaborator';
      const email = emailInput ? emailInput.value.trim() : '';
      const msg = msgInput ? msgInput.value.trim() : '';

      const subject = encodeURIComponent(`[OPPORTUNITY] Engineering Discussion — ${name}`);
      const body = encodeURIComponent(`Hi Shahil,\n\n${msg}\n\nFrom: ${name}\nEmail: ${email}`);

      // Auto launch Gmail web compose in a new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=shahilch15@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      // Copy text to clipboard as secondary safeguard
      navigator.clipboard.writeText(`To: shahilch15@gmail.com\nFrom: ${name} (${email})\n\n${msg}`).catch(() => {});

      contactForm.reset();
      victoryModal.classList.add('active');
      if (window.arcadeAudio) {
        window.arcadeAudio.playVictory();
      }
    });
  }

  if (closeVictoryBtn && victoryModal) {
    closeVictoryBtn.addEventListener('click', () => {
      victoryModal.classList.remove('active');
      if (window.arcadeAudio) window.arcadeAudio.playBack();
      switchScreen('main-menu');
    });
  }

  // --------------------------------------------------------------------------
  // Cyberpunk Aerospace Combat Simulation Engine (Supersonic Jets & Rockets)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Atmospheric Cyber Embers
    const embers = [];
    const emberCount = Math.min(width > 768 ? 35 : 18, 45);
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        speedY: Math.random() * -0.7 - 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#ff2a6d' : '#05d9e8'
      });
    }

    // Active Aerospace Entities
    const jets = [];
    const rockets = [];
    const explosions = [];
    const smokeParticles = [];
    const targetReticles = [];

    // Particle Classes
    class SmokeParticle {
      constructor(x, y, vx, vy, color, initialRadius = 3, maxRadius = 14, decay = 0.02) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.radius = initialRadius;
        this.maxRadius = maxRadius;
        this.alpha = 0.85;
        this.decay = decay;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius = Math.min(this.maxRadius, this.radius + 0.3);
        this.alpha -= this.decay;
      }
      draw(c) {
        if (this.alpha <= 0) return;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.globalAlpha = Math.max(0, this.alpha * 0.55);
        c.shadowBlur = 10;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    // Cyberpunk Supersonic Stealth Fighter Jet
    class CyberJet {
      constructor(options = {}) {
        this.direction = options.direction || (Math.random() > 0.5 ? 1 : -1);
        this.x = this.direction === 1 ? -120 : width + 120;
        this.y = options.y || Math.random() * (height * 0.65) + 50;
        this.speed = options.speed || Math.random() * 7 + 14;
        this.vx = this.direction * this.speed;
        this.vy = options.vy || (Math.random() - 0.5) * 2;
        this.scale = options.scale || Math.random() * 0.35 + 0.85;
        this.color = options.color || (Math.random() > 0.4 ? '#05d9e8' : '#ff2a6d');
        this.afterburnerPulse = 0;
        this.dead = false;

        // Sound trigger
        if (window.arcadeAudio && Math.random() > 0.4) {
          window.arcadeAudio.playJetFlyby();
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.afterburnerPulse += 0.3;

        // Emit plasma afterburner smoke & fire
        const engineOffsetX = this.direction === 1 ? -28 * this.scale : 28 * this.scale;
        smokeParticles.push(new SmokeParticle(
          this.x + engineOffsetX,
          this.y + (Math.random() - 0.5) * 3,
          -this.vx * 0.15 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          this.color,
          3 * this.scale,
          16 * this.scale,
          0.022
        ));

        // Offscreen check
        if ((this.direction === 1 && this.x > width + 150) || (this.direction === -1 && this.x < -150)) {
          this.dead = true;
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        if (this.direction === -1) {
          c.scale(-1, 1);
        }
        c.scale(this.scale, this.scale);

        // Afterburner Flame (Pulsing plasma exhaust cone)
        const flameLen = 35 + Math.sin(this.afterburnerPulse) * 8;
        const grad = c.createLinearGradient(0, 0, -flameLen, 0);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, this.color);
        grad.addColorStop(1, 'transparent');

        c.beginPath();
        c.moveTo(-18, -4);
        c.lineTo(-18 - flameLen, 0);
        c.lineTo(-18, 4);
        c.closePath();
        c.fillStyle = grad;
        c.shadowBlur = 18;
        c.shadowColor = this.color;
        c.fill();

        // Sleek Forward-Swept Stealth Airframe
        c.beginPath();
        c.moveTo(32, 0); // Nose tip
        c.lineTo(8, -6);
        c.lineTo(-12, -22); // Left wingtip
        c.lineTo(-6, -6);
        c.lineTo(-20, -5); // Left engine
        c.lineTo(-16, 0);  // Tail center
        c.lineTo(-20, 5);  // Right engine
        c.lineTo(-6, 6);
        c.lineTo(-12, 22);  // Right wingtip
        c.lineTo(8, 6);
        c.closePath();

        c.fillStyle = '#0a101d';
        c.fill();
        c.lineWidth = 1.6;
        c.strokeStyle = this.color;
        c.shadowBlur = 10;
        c.shadowColor = this.color;
        c.stroke();

        // Glowing Cockpit Canopy
        c.beginPath();
        c.ellipse(12, 0, 8, 3, 0, 0, Math.PI * 2);
        c.fillStyle = '#ffffff';
        c.globalAlpha = 0.9;
        c.shadowBlur = 12;
        c.shadowColor = '#00ffea';
        c.fill();

        // Wingtip Tactical Strobe Lights
        c.beginPath();
        c.arc(-12, -22, 2, 0, Math.PI * 2);
        c.fillStyle = '#ff0055';
        c.fill();

        c.beginPath();
        c.arc(-12, 22, 2, 0, Math.PI * 2);
        c.fillStyle = '#00ff88';
        c.fill();

        c.restore();
      }
    }

    // Tactical Interceptor Ballistic Rocket
    class CyberRocket {
      constructor(startX, startY, targetX, targetY) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;

        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.hypot(dx, dy);

        this.angle = Math.atan2(dy, dx);
        this.speed = 4;
        this.accel = 1.055;
        this.maxSpeed = 24;
        this.color = Math.random() > 0.5 ? '#ffb800' : '#05d9e8';
        this.dead = false;

        if (window.arcadeAudio) {
          window.arcadeAudio.playMissileLaunch();
        }
      }

      update() {
        this.speed = Math.min(this.maxSpeed, this.speed * this.accel);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Trail smoke & spark
        smokeParticles.push(new SmokeParticle(
          this.x,
          this.y,
          -Math.cos(this.angle) * 2 + (Math.random() - 0.5) * 0.8,
          -Math.sin(this.angle) * 2 + (Math.random() - 0.5) * 0.8,
          '#ff6b35',
          2,
          10,
          0.03
        ));

        // Check distance to target
        const distRemaining = Math.hypot(this.targetX - this.x, this.targetY - this.y);
        if (distRemaining < 25 || this.y < 30 || this.x < -40 || this.x > width + 40) {
          this.dead = true;
          createExplosion(this.x, this.y, this.color);
        }
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);

        // Rocket Flame
        c.beginPath();
        c.moveTo(-6, -2);
        c.lineTo(-24, 0);
        c.lineTo(-6, 2);
        c.closePath();
        c.fillStyle = '#ffb800';
        c.shadowBlur = 15;
        c.shadowColor = '#ff6b35';
        c.fill();

        // Missile Body
        c.beginPath();
        c.moveTo(10, 0);
        c.lineTo(-6, -3);
        c.lineTo(-8, -6);
        c.lineTo(-6, 0);
        c.lineTo(-8, 6);
        c.lineTo(-6, 3);
        c.closePath();
        c.fillStyle = '#ffffff';
        c.strokeStyle = this.color;
        c.lineWidth = 1.5;
        c.fill();
        c.stroke();

        c.restore();
      }
    }

    // Detonation & Plasma Shockwave System
    class CyberExplosion {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.ringRadius = 4;
        this.maxRingRadius = Math.random() * 25 + 40;
        this.ringAlpha = 1;
        this.dead = false;

        this.sparks = [];
        const sparkCount = 28;
        for (let i = 0; i < sparkCount; i++) {
          const spd = Math.random() * 7 + 2;
          const ang = Math.random() * Math.PI * 2;
          this.sparks.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            color: Math.random() > 0.4 ? color : '#ffffff',
            radius: Math.random() * 2.5 + 1,
            alpha: 1,
            decay: Math.random() * 0.025 + 0.018
          });
        }

        if (window.arcadeAudio) {
          window.arcadeAudio.playMissileExplosion();
        }
      }

      update() {
        this.ringRadius += 2.5;
        this.ringAlpha -= 0.04;

        let aliveSparks = 0;
        this.sparks.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.94;
          s.vy = s.vy * 0.94 + 0.1; // gravity
          s.alpha -= s.decay;
          if (s.alpha > 0) aliveSparks++;
        });

        if (this.ringAlpha <= 0 && aliveSparks === 0) {
          this.dead = true;
        }
      }

      draw(c) {
        c.save();
        // Expanding shockwave ring
        if (this.ringAlpha > 0) {
          c.beginPath();
          c.arc(this.x, this.y, this.ringRadius, 0, Math.PI * 2);
          c.strokeStyle = this.color;
          c.lineWidth = 2.5;
          c.globalAlpha = Math.max(0, this.ringAlpha);
          c.shadowBlur = 20;
          c.shadowColor = this.color;
          c.stroke();
        }

        // Sparks
        this.sparks.forEach(s => {
          if (s.alpha <= 0) return;
          c.beginPath();
          c.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          c.fillStyle = s.color;
          c.globalAlpha = Math.max(0, s.alpha);
          c.shadowBlur = 8;
          c.shadowColor = s.color;
          c.fill();
        });
        c.restore();
      }
    }

    function createExplosion(x, y, color) {
      explosions.push(new CyberExplosion(x, y, color));
    }

    // Targeting Reticle System
    class TargetReticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 24;
        this.rotation = 0;
        this.alpha = 1;
        this.dead = false;
      }
      update() {
        this.rotation += 0.08;
        this.radius = Math.max(14, this.radius - 0.4);
        this.alpha -= 0.015;
        if (this.alpha <= 0) this.dead = true;
      }
      draw(c) {
        if (this.alpha <= 0) return;
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.alpha;
        c.strokeStyle = '#ff2a6d';
        c.lineWidth = 1.8;
        c.shadowBlur = 10;
        c.shadowColor = '#ff2a6d';

        // 4 Brackets
        for (let i = 0; i < 4; i++) {
          c.rotate(Math.PI / 2);
          c.beginPath();
          c.arc(0, 0, this.radius, -0.3, 0.3);
          c.stroke();
        }

        // Center dot
        c.beginPath();
        c.arc(0, 0, 2, 0, Math.PI * 2);
        c.fillStyle = '#05d9e8';
        c.fill();

        c.restore();
      }
    }

    // Launch Squadron (Delta Formation)
    function scrambleSquadron() {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const baseAlt = Math.random() * (height * 0.4) + 60;
      const spd = 18;
      jets.push(new CyberJet({ direction: dir, y: baseAlt, speed: spd, scale: 1 }));
      setTimeout(() => {
        jets.push(new CyberJet({ direction: dir, y: baseAlt - 45, speed: spd, scale: 0.85 }));
        jets.push(new CyberJet({ direction: dir, y: baseAlt + 45, speed: spd, scale: 0.85 }));
      }, 250);
    }

    // Launch Ballistic Volley
    function launchVolley() {
      const count = 3;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const startX = Math.random() > 0.5 ? 40 : width - 40;
          const targetX = Math.random() * (width * 0.8) + width * 0.1;
          const targetY = Math.random() * (height * 0.5) + 60;
          rockets.push(new CyberRocket(startX, height + 20, targetX, targetY));
        }, i * 300);
      }
    }

    // Spawning Clock
    let jetTimer = 0;
    let rocketTimer = 0;

    // Interactive targeting when clicking on screen
    window.addEventListener('click', (e) => {
      // Ignore clicks on interactive controls
      if (e.target.closest('button, a, input, textarea, .menu-card, .stage-card, .vault-modal-window, .boss-modal-window, .email-dispatch-window, .char-select-container')) {
        return;
      }
      const clickX = e.clientX;
      const clickY = e.clientY;

      targetReticles.push(new TargetReticle(clickX, clickY));

      const startX = clickX < width / 2 ? 40 : width - 40;
      rockets.push(new CyberRocket(startX, height + 20, clickX, clickY));
    });

    // Control buttons in telemetry overlay
    const scrambleBtn = document.getElementById('btn-scramble-jets');
    if (scrambleBtn) {
      scrambleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scrambleSquadron();
      });
    }

    const fireRocketBtn = document.getElementById('btn-fire-rocket');
    if (fireRocketBtn) {
      fireRocketBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        launchVolley();
      });
    }

    // Initial ambient jets
    setTimeout(() => {
      jets.push(new CyberJet({ direction: 1, y: 120, speed: 16 }));
    }, 1200);

    // Master Aerospace Animation Loop
    function animateAerospaceCombat() {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Embers
      embers.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Update & Draw Reticles
      for (let i = targetReticles.length - 1; i >= 0; i--) {
        const ret = targetReticles[i];
        ret.update();
        ret.draw(ctx);
        if (ret.dead) targetReticles.splice(i, 1);
      }

      // 3. Update & Draw Smoke
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const sp = smokeParticles[i];
        sp.update();
        sp.draw(ctx);
        if (sp.alpha <= 0) smokeParticles.splice(i, 1);
      }

      // 4. Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw(ctx);
        if (r.dead) rockets.splice(i, 1);
      }

      // 5. Update & Draw Jets
      for (let i = jets.length - 1; i >= 0; i--) {
        const j = jets[i];
        j.update();
        j.draw(ctx);
        if (j.dead) jets.splice(i, 1);
      }

      // 6. Update & Draw Explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i];
        exp.update();
        exp.draw(ctx);
        if (exp.dead) explosions.splice(i, 1);
      }

      // Autonomous Ambient Timers
      jetTimer++;
      if (jetTimer > 320) { // ~5.3 seconds
        jetTimer = 0;
        if (Math.random() > 0.3) {
          jets.push(new CyberJet());
        }
      }

      rocketTimer++;
      if (rocketTimer > 450) { // ~7.5 seconds
        rocketTimer = 0;
        if (Math.random() > 0.4) {
          const startX = Math.random() > 0.5 ? 40 : width - 40;
          const targetX = Math.random() * (width * 0.7) + width * 0.15;
          const targetY = Math.random() * (height * 0.45) + 60;
          rockets.push(new CyberRocket(startX, height + 20, targetX, targetY));
        }
      }

      requestAnimationFrame(animateAerospaceCombat);
    }

    animateAerospaceCombat();
  }
});
