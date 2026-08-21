/* ================================================================
   ALY'S BIRTHDAY SITE â€” script.js ðŸ’•
   Tela 1: Countdown â†’ Tela 2: Login animado â†’ Tela 3: Principal
================================================================ */

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONFIGURAÃ‡ÃƒO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let BIRTHDAY   = new Date('2026-08-24T00:00:00');
const LOGIN_USER = 'Ally';
const LOGIN_PASS = 'Presente';

// ID do YouTube — O Sol (Vitor Kley)
const YT_VIDEO_ID = 'hQ6a5t00k8w';

// Hearts as HTML entities — encoding-safe, no emoji corruption
const HEART_ENTS = [
  '&#128149;', // 💕
  '&#128150;', // 💖
  '&#128151;', // 💗
  '&#128157;', // 💝
  '&#127800;', // 🌸
  '&#10024;',  // ✨
  '&#128171;', // 💫
  '&#127799;', // 🌷
  '&#128144;', // 💐
  '&#10084;'   // ❤
];

let heartInterval = null;

function spawnHeart() {
  const bg = document.getElementById('hearts-bg');
  if (!bg) return;

  const h = document.createElement('span');
  h.className = 'fheart';
  h.innerHTML = HEART_ENTS[Math.floor(Math.random() * HEART_ENTS.length)];
  h.setAttribute('aria-hidden', 'true');

  const size     = 1.0 + Math.random() * 1.4;
  const duration = 5   + Math.random() * 7;
  const startX   = Math.random() * 98;

  h.style.left              = startX + '%';
  h.style.fontSize          = size + 'rem';
  h.style.animationDuration = duration + 's';
  // negative delay: hearts already mid-fall on load
  h.style.animationDelay    = '-' + (Math.random() * duration * 0.8) + 's';

  bg.appendChild(h);
  setTimeout(() => h.remove(), (duration + 0.5) * 1000);
}
function startHearts(density = 600) {
  // Seed a few hearts immediately so screen isn't empty
  for (let i = 0; i < 8; i++) spawnHeart();
  if (heartInterval) clearInterval(heartInterval);
  heartInterval = setInterval(spawnHeart, density);
}

// ────────────────────────────────────────────────────────────────
// TRANSIÇÃO SUAVE ENTRE TELAS
// ────────────────────────────────────────────────────────────────
function switchScreen(fromId, toId, callback) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  if (!from || !to) return;

  const bgMap = {
    'screen-countdown': 'active-countdown',
    'screen-login':     'active-login',
    'screen-minigame':  'active-minigame',
    'screen-main':      'active-main'
  };

  // Transição deslizante exclusivamente da Parte 1 (Cronômetro) para a Parte 2 (Login)
  if (fromId === 'screen-countdown' && toId === 'screen-login') {
    const screenBg = document.getElementById('screen-bg');
    if (screenBg && bgMap[toId]) {
      screenBg.className = 'screen-bg ' + bgMap[toId];
    }

    from.style.transition = 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
    from.style.transform  = 'translateY(-100%)';

    to.classList.add('active');
    to.style.display    = 'flex';
    to.style.transform  = 'translateY(100%)';
    to.style.opacity    = '1';
    to.style.transition = 'none';
    void to.offsetHeight;

    to.style.transition = 'transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
    to.style.transform  = 'translateY(0)';

    setTimeout(() => {
      from.classList.remove('active');
      from.style.display    = 'none';
      from.style.transform  = '';
      from.style.transition = '';
      to.style.transform    = '';
      to.style.transition   = '';
      if (callback) callback();
    }, 950);
    return;
  }

  // Fade out padrão para demais telas
  from.style.transition = 'opacity 0.5s ease';
  from.style.opacity    = '0';

  setTimeout(() => {
    from.style.transition = '';
    from.style.opacity    = '';
    from.classList.remove('active');
    from.style.display    = 'none';

    const screenBg = document.getElementById('screen-bg');
    if (screenBg && bgMap[toId]) {
      screenBg.className = 'screen-bg ' + bgMap[toId];
    }

    to.classList.add('active');
    // screen-main é um scroll container, usa display:block
    to.style.display    = (toId === 'screen-main') ? 'block' : 'flex';
    to.style.opacity    = '0';
    to.style.transition = 'none';
    void to.offsetHeight;

    to.style.transition = 'opacity 0.6s ease';
    to.style.opacity    = '1';

    setTimeout(() => {
      to.style.transition = '';
      to.style.opacity    = '';
      if (callback) callback();
    }, 630);
  }, 520);
}



// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TELA 1 â€” COUNTDOWN
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let countdownInterval = null;

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now  = new Date();
  const diff = BIRTHDAY - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    clearInterval(countdownInterval);

    // Aguarda 1s mostrando o zero, depois desliza para baixo revelando o login
    setTimeout(() => {
      const from = document.getElementById('screen-countdown');
      const to   = document.getElementById('screen-login');

      to.classList.add('active');
      to.style.display    = 'flex';
      to.style.transform  = 'translateY(100%)';
      to.style.opacity    = '1';
      to.style.transition = 'none';
      void to.offsetHeight;

      from.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)';
      from.style.transform  = 'translateY(-100%)';
      to.style.transition   = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)';
      to.style.transform    = 'translateY(0)';

      const screenBg = document.getElementById('screen-bg');
      if (screenBg) screenBg.className = 'screen-bg active-login';

      setTimeout(() => {
        from.classList.remove('active');
        from.style.display    = 'none';
        from.style.transform  = '';
        from.style.transition = '';
        to.style.transform    = '';
        to.style.transition   = '';
        setTimeout(startLoginAnimation, 700);
      }, 1050);
    }, 1000);
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent    = pad(days);
  document.getElementById('cd-hours').textContent   = pad(hours);
  document.getElementById('cd-minutes').textContent = pad(minutes);
  document.getElementById('cd-seconds').textContent = pad(seconds);
}

function startCountdown() {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}
// TELA 2 â€” LOGIN ANIMADO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function typeInto(inputEl, text, msPerChar) {
  return new Promise(resolve => {
    let i = 0;
    inputEl.value = '';
    const iv = setInterval(() => {
      inputEl.value += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(iv);
        setTimeout(resolve, 400);
      }
    }, msPerChar);
  });
}

async function startLoginAnimation() {
  const userInput = document.getElementById('login-user');
  const passInput = document.getElementById('login-pass');
  const loginBtn  = document.getElementById('login-btn');

  // Pisca o campo usuÃ¡rio antes de digitar
  userInput.focus();
  await sleep(500);

  await typeInto(userInput, LOGIN_USER, 110);

  passInput.focus();
  await sleep(300);

  await typeInto(passInput, LOGIN_PASS, 110);

  // Habilita botÃ£o com animaÃ§Ã£o
  await sleep(300);
  loginBtn.disabled = false;
  loginBtn.classList.add('glow');

  // Clica automaticamente apÃ³s 1.2s
  await sleep(1200);
  loginBtn.click();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// LOGIN â€” BOTÃƒO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initLoginBtn() {
  const btn = document.getElementById('login-btn');
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    btn.innerHTML = '<span>Abrindo seu presente...</span> <span>ðŸŽ</span>';
    btn.disabled  = true;
    setTimeout(() => {
      switchScreen('screen-login', 'screen-minigame', initMinigame);
    }, 800);
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TELA 3 â€” ABAS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTabs() {
  const btns   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MODAIS BÃBLICOS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CARD_MODAL_MAP = {
  'bcard-sofremos': 'modal-sofremos',
  'bcard-deus':     'modal-deus',
  'bcard-luta':     'modal-luta',
};

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Focus trap: foca o botÃ£o de fechar
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function initModals() {
  // Abrir pelo card
  Object.entries(CARD_MODAL_MAP).forEach(([cardId, modalId]) => {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.addEventListener('click',   () => openModal(modalId));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(modalId);
      }
    });
  });

  // Fechar pelo botÃ£o âœ•
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });

  // Fechar ao clicar no overlay
  document.querySelectorAll('.modal-bg').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Fechar com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-bg.open').forEach(m => closeModal(m.id));
    }
  });
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MÃšSICA DE FUNDO â€” YouTube IFrame API
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let isAudioPlaying = false;

function getAudioElement() {
  return document.getElementById('bg-audio');
}

function startMusic() {
  const audio = getAudioElement();
  if (!audio) return;
  audio.volume = 0.5;

  const tryPlay = () => {
    if (isAudioPlaying) return;
    audio.play().then(() => {
      isAudioPlaying = true;
      updateMusicBtn();
      removeAutoListeners();
    }).catch(() => {});
  };

  const removeAutoListeners = () => {
    ['click', 'keydown', 'touchstart', 'pointerdown', 'mousemove', 'scroll'].forEach(evt => {
      window.removeEventListener(evt, tryPlay);
    });
  };

  // Tenta tocar imediatamente ao carregar
  tryPlay();

  // Se o navegador bloquear o toque direto sem gesto, qualquer movimento do mouse, toque ou rolagem ativa na hora!
  if (!isAudioPlaying) {
    ['click', 'keydown', 'touchstart', 'pointerdown', 'mousemove', 'scroll'].forEach(evt => {
      window.addEventListener(evt, tryPlay, { once: true, passive: true });
    });
  }
}

function toggleMusic() {
  const audio = getAudioElement();
  if (!audio) return;

  if (isAudioPlaying) {
    audio.pause();
    isAudioPlaying = false;
  } else {
    audio.volume = 0.5;
    audio.play().then(() => {
      isAudioPlaying = true;
      updateMusicBtn();
    }).catch(err => console.log('Erro ao tocar áudio:', err));
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn  = document.getElementById('music-btn');
  const icon = document.getElementById('music-icon');
  if (!btn || !icon) return;

  if (isAudioPlaying) {
    btn.classList.add('playing');
    icon.textContent = '🎵';
    btn.querySelector('.music-label').textContent = '♪ Pausar';
  } else {
    btn.classList.remove('playing');
    icon.textContent = '▶️';
    btn.querySelector('.music-label').textContent = '♪ Tocar';
  }
}

function initMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (btn) btn.addEventListener('click', toggleMusic);
}

function showMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (btn) setTimeout(() => btn.classList.add('visible'), 1000);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TICKER â€” duplica os itens para loop infinito perfeito
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  // Clona todos os filhos para criar loop contÃ­nuo
  const items = Array.from(track.children);
  items.forEach(item => track.appendChild(item.cloneNode(true)));
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MODO DEV â€” pule o countdown adicionando ?dev na URL
// Ex: index.html?dev          â†’ vai direto ao login
//     index.html?dev=main     â†’ vai direto Ã  pÃ¡gina principal
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function handleDevMode() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('dev')) return false;

  const target = params.get('dev');

  if (target === 'main') {
    switchScreen('screen-countdown', 'screen-main', () => {
      startMusic();
      showMusicBtn();
      initTextParallax();
    });
  } else if (target === 'game' || target === 'minigame') {
    switchScreen('screen-countdown', 'screen-minigame', () => {
      initMinigame();
    });
  } else if (target === 'video') {
    switchScreen('screen-countdown', 'screen-video', () => {
      initVideoScreen();
    });
  } else {
    switchScreen('screen-countdown', 'screen-login', () => {
      setTimeout(startLoginAnimation, 500);
    });
  }
  return true;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// INIT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {
  // startHearts();
  initLoginBtn();
  initTabs();
  initModals();
  initMusicBtn();
  showMusicBtn();
  startMusic();
  initTicker();

  if (!handleDevMode()) {
    startCountdown();
  }
});






// ────────────────────────────────────────────────────────────────
// TELA 2.5 — MINIGAME (DINO RUN)
// ────────────────────────────────────────────────────────────────
let isJumping = false;
let gameScore = 0;
let gameInterval;
let animInterval;
let obstacleTimeout;
const maxScore = 500;

function initMinigame() {
  const dino = document.getElementById('dino');
  const obstacle = document.getElementById('obstacle');
  const scoreVal = document.getElementById('score-val');
  const gameBoard = document.getElementById('game-board');
  const startOverlay = document.getElementById('game-start-overlay');
  
  // Limpar intervals de jogo anterior
  clearInterval(gameInterval);
  clearInterval(animInterval);
  
  // Pause/Reset
  gameBoard.classList.remove('run-bg');
  obstacle.classList.remove('move-obstacle');
  obstacle.style.animationPlayState = '';
  gameBoard.style.animationPlayState = '';
  
  // Reset
  gameScore = 0;
  isJumping = false;
  scoreVal.textContent = '0';
  dino.style.backgroundImage = `url('correndo1.png')`;
  dino.classList.remove('jump');

  // Mostrar overlay inicial
  startOverlay.style.display = 'flex';
}

function startGameAction() {
  document.getElementById('game-start-overlay').style.display = 'none';
  document.getElementById('game-board').classList.add('run-bg');
  
  const minigameScreen = document.getElementById('screen-minigame');
  document.addEventListener('keydown', handleJump);
  minigameScreen.addEventListener('mousedown', handleJump);
  minigameScreen.addEventListener('touchstart', handleJump, {passive: true});
  
  startGame();
}

function restartGameAction() {
  clearInterval(gameInterval);
  clearInterval(animInterval);

  // Remove listeners antes de re-adicionar para evitar acúmulo
  const minigameScreen = document.getElementById('screen-minigame');
  document.removeEventListener('keydown', handleJump);
  minigameScreen.removeEventListener('mousedown', handleJump);
  minigameScreen.removeEventListener('touchstart', handleJump);
  
  document.getElementById('game-over-overlay').style.display = 'none';
  const obstacle = document.getElementById('obstacle');
  const gameBoard = document.getElementById('game-board');
  
  // Forçar o obstáculo a voltar e despausar
  obstacle.classList.remove('move-obstacle');
  obstacle.style.animationPlayState = '';
  
  // Resetar animação do fundo da cidade
  gameBoard.style.animationPlayState = '';
  gameBoard.classList.remove('run-bg');
  
  // Trigger reflow para aplicar o reset nas animações imediatamente
  void obstacle.offsetWidth;
  void gameBoard.offsetWidth;
  
  gameScore = 0;
  isJumping = false;
  document.getElementById('score-val').textContent = '0';
  document.getElementById('dino').classList.remove('jump');
  
  startGameAction();
}



function startGame() {
  const dino = document.getElementById('dino');
  const obstacle = document.getElementById('obstacle');
  const scoreVal = document.getElementById('score-val');

  // Set random obstacle logic
  const obstacleTypes = ['mulher1.png', 'mulher2.png', 'mulher3.png', 'emoji'];
  function randomizeObstacle() {
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    if (type === 'emoji') {
      obstacle.style.backgroundImage = 'none';
      obstacle.innerHTML = '💔';
      obstacle.style.display = 'flex';
      obstacle.style.alignItems = 'center';
      obstacle.style.justifyContent = 'center';
      obstacle.style.fontSize = '40px'; 
      obstacle.style.filter = 'drop-shadow(0 4px 10px rgba(255,0,0,0.3))';
    } else {
      obstacle.innerHTML = '';
      obstacle.style.filter = 'none';
      obstacle.style.backgroundImage = `url('${type}')`;
    }
  }
  randomizeObstacle();
  // Change image every time it loops
  obstacle.addEventListener('animationiteration', randomizeObstacle);

  // Start obstacle animation
  obstacle.classList.add('move-obstacle');

  // Start character running animation (5 frames)
  let runFrame = 1;
  animInterval = setInterval(() => {
    if (!isJumping) {
      runFrame++;
      if (runFrame > 5) runFrame = 1;
      dino.style.backgroundImage = `url('correndo${runFrame}.png')`;
    }
  }, 100); // 10 fps

  
  // Score and collision loop
  gameInterval = setInterval(() => {
    // Increment score
    gameScore++;
    scoreVal.textContent = gameScore;
    
    // Check win condition
    if (gameScore >= maxScore) {
      winGame();
      return;
    }
    
    // Check collision
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    // Since we animated 'right', get left position to compare
    const dinoRect = dino.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();
    
    // Simple AABB collision logic
    const margin = 28; // Hitbox bem menor (mais fácil)
    if (
      obsRect.left < dinoRect.right - margin &&
      obsRect.right > dinoRect.left + margin &&
      obsRect.top < dinoRect.bottom - margin &&
      obsRect.bottom > dinoRect.top + margin
    ) {
      // Collision!
      gameOver();
    }
  }, 50); // Checks every 50ms (faster for score increment and collision)
}

function handleJump(e) {
  if (e.code === 'Space' || e.type === 'mousedown' || e.type === 'touchstart') {
    if (e.type === 'keydown') e.preventDefault(); // Stop spacebar scrolling
    jump();
  }
}

function jump() {
  const dino = document.getElementById('dino');
  if (isJumping) return;
  
  isJumping = true;
  dino.classList.add('jump');
  
  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 600); // Must match CSS animation duration
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(animInterval);
  
  const minigameScreen = document.getElementById('screen-minigame');
  const obstacle = document.getElementById('obstacle');
  const gameBoard = document.getElementById('game-board');
  const dino = document.getElementById('dino');
  
  // Pause obstacle exactly where it hit
  obstacle.style.animationPlayState = 'paused';
  // Pause background
  gameBoard.style.animationPlayState = 'paused';
  
  document.removeEventListener('keydown', handleJump);
  minigameScreen.removeEventListener('mousedown', handleJump);
  minigameScreen.removeEventListener('touchstart', handleJump);
  
  dino.style.backgroundImage = `url('correndo1.png')`;
  
  document.getElementById('game-over-overlay').style.display = 'flex';
}

function winGame() {
  clearInterval(gameInterval);
  clearInterval(animInterval);
  const minigameScreen = document.getElementById('screen-minigame');
  const obstacle = document.getElementById('obstacle');
  const dino = document.getElementById('dino');
  const gameBoard = document.getElementById('game-board');
  
  obstacle.classList.remove('move-obstacle');
  gameBoard.style.animationPlayState = 'paused';
  
  document.removeEventListener('keydown', handleJump);
  minigameScreen.removeEventListener('mousedown', handleJump);
  minigameScreen.removeEventListener('touchstart', handleJump);
  
  // Stop character on the first frame
  dino.style.backgroundImage = `url('correndo1.png')`;

  
  // Change instruction text temporarily
  const inst = document.querySelector('.game-instruction');
  if (inst) inst.innerHTML = '<b>Você conseguiu!</b> Abrindo seu presente...';
  
  setTimeout(() => {
    switchScreen('screen-minigame', 'screen-video', initVideoScreen);
  }, 1500);
}

function skipMinigameAction() {
  if (gameInterval) clearInterval(gameInterval);
  if (animInterval) clearInterval(animInterval);
  const minigameScreen = document.getElementById('screen-minigame');
  if (minigameScreen) {
    minigameScreen.removeEventListener('keydown', handleJump);
    minigameScreen.removeEventListener('mousedown', handleJump);
    minigameScreen.removeEventListener('touchstart', handleJump);
  }
  document.removeEventListener('keydown', handleJump);
  switchScreen('screen-minigame', 'screen-video', initVideoScreen);
}

// ────────────────────────────────────────────────────────────────
// TELA 2.7 — VÍDEO
// ────────────────────────────────────────────────────────────────
function initVideoScreen() {
  // Pausa a música de fundo para ouvir o áudio do vídeo da cena final
  const audio = getAudioElement();
  if (audio) audio.pause();
  isAudioPlaying = false;
  updateMusicBtn();

  const videoEl = document.getElementById('reward-video');
  if (videoEl) {
    videoEl.currentTime = 0;
    videoEl.play().catch(e => console.log('Autoplay preventido pelo navegador:', e));
    videoEl.addEventListener('ended', finishVideoTransition);
  }
}

function initMainScreen() {
  const videoEl = document.getElementById('reward-video');
  if (videoEl) videoEl.pause();

  switchScreen('screen-video', 'screen-main', () => {
    startMusic();
    showMusicBtn();
    initTextParallax();
  });
}

function finishVideoTransition() {
  // Check if we already transitioned
  if (!document.getElementById('screen-video').classList.contains('active')) return;
  
  initMainScreen();
}

function initTextParallax() {
  const mainScreen = document.getElementById('screen-main');
  const textElem = document.getElementById('arc-text-container');
  if (!mainScreen || !textElem) return;

  // Cria container das fotos
  let photosContainer = document.getElementById('floating-photos-container');
  if (!photosContainer) {
    photosContainer = document.createElement('div');
    photosContainer.id = 'floating-photos-container';
    photosContainer.className = 'floating-photos-container';
    const textTrack = document.querySelector('.scroll-track-text');
    mainScreen.insertBefore(photosContainer, textTrack);
  } else {
    photosContainer.innerHTML = ''; // Limpa se já existir
  }

  // Prepara as fotos (2 sets de 8, embaralhados, garantindo sem repetição seguida)
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  let set1 = shuffle([1,2,3,4,5,6,7,8]);
  let set2 = shuffle([1,2,3,4,5,6,7,8]);
  if (set1[7] === set2[0]) {
    set2.reverse();
  }
  const photoIndices = [...set1, ...set2];

  // Gera os elementos no DOM
  const photoElements = photoIndices.map((idx, i) => {
    const el = document.createElement('img');
    el.src = `foto (${idx}).jpeg`;
    el.className = 'floating-photo';
    photosContainer.appendChild(el);

    // Configurações individuais
    const left = 5 + Math.random() * 70; // 5vw a 75vw
    const size = window.innerWidth > 768 ? (12 + Math.random() * 10) : (25 + Math.random() * 15);
    const rot = -30 + Math.random() * 60; // rotação fixa por foto

    el.style.left = `${left}vw`;
    el.style.width = `${size}vw`;
    // Começam escondidas
    el.style.transform = `translateY(150vh) rotate(${rot}deg)`;

    // Tempos de entrada (dentro da fase 2 do scroll)
    const startP = (i / 16) * 0.7; // Distribui a largada das 16 fotos
    const endP = startP + 0.3; // Cada foto leva 30% do tempo total para cruzar a tela

    return { el, startP, endP, rot };
  });

  let currentProgress = 0;
  let targetProgress = 0;
  let trackHeight = 1;
  const updateTrackHeight = () => {
    trackHeight = mainScreen.scrollHeight - mainScreen.clientHeight;
    if (trackHeight <= 0) trackHeight = 1;
  };
  
  mainScreen.addEventListener('scroll', () => {
    targetProgress = mainScreen.scrollTop / trackHeight;
    targetProgress = Math.max(0, Math.min(targetProgress, 1));
  });

  const render = () => {
    currentProgress += (targetProgress - currentProgress) * 0.05;

    if (mainScreen.classList.contains('active')) {
      // Fase 1: Texto entra (0% a 10%)
      let textEnterProgress = Math.min(currentProgress / 0.10, 1.0);
      
      // Fase 2: Fotos passam (10% a 40%)
      let photosProgress = Math.max(0, Math.min((currentProgress - 0.10) / 0.30, 1.0));

      // Fase 3: Texto sai (35% a 45%)
      let textExitProgress = Math.max(0, Math.min((currentProgress - 0.35) / 0.10, 1.0));

      // Fase 4: Fundo sai e Card entra (40% a 50%)
      let bgExitProgress = Math.max(0, Math.min((currentProgress - 0.40) / 0.10, 1.0));

      // Fase 5: Texto da Carta sobe (50% a 100%)
      let letterProgress = Math.max(0, Math.min((currentProgress - 0.50) / 0.50, 1.0));

      // --- ANIMAÇÃO DO TEXTO INICIAL ---
      const startY = window.innerHeight * 0.8; 
      const endY = 0; 
      const currentY = startY + (endY - startY) * textEnterProgress;

      const startX = -window.innerWidth * 0.6;
      const endX = 0;
      const linearX = startX + (endX - startX) * textEnterProgress;

      const arcX = Math.sin(textEnterProgress * Math.PI) * (window.innerWidth * 0.2);
      const arcY = Math.sin(textEnterProgress * Math.PI) * (-window.innerHeight * 0.6);
      
      let finalX = linearX + arcX;
      let finalY = currentY + arcY;

      finalY -= (window.innerHeight * 1.5) * textExitProgress;

      const rot = -25 * (1 - textEnterProgress);
      const scale = 0.6 + (0.4 * textEnterProgress);

      textElem.style.transform = `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) rotate(${rot}deg) scale(${scale})`;

      // --- ANIMAÇÃO DAS FOTOS ---
      photoElements.forEach(p => {
        if (photosProgress < p.startP) {
          p.el.style.transform = `translateY(150vh) rotate(${p.rot}deg)`;
        } else if (photosProgress > p.endP) {
          p.el.style.transform = `translateY(-150vh) rotate(${p.rot}deg)`;
        } else {
          const localProgress = (photosProgress - p.startP) / (p.endP - p.startP);
          const y = window.innerHeight * 1.5 - (window.innerHeight * 3 * localProgress);
          p.el.style.transform = `translateY(${y}px) rotate(${p.rot}deg)`;
        }
      });

      // --- ANIMAÇÃO DO FUNDO E DO CARD ---
      const bgLayer1 = document.getElementById('bg-layer-1');
      if (bgLayer1) {
        bgLayer1.style.transform = `translate(-50%, calc(-50% - ${bgExitProgress * 120}vh))`;
      }

      const pinkCard = document.getElementById('pink-card');
      if (pinkCard) {
        const cardY = 150 - (150 * bgExitProgress);
        pinkCard.style.transform = `translate(-50%, calc(-50% + ${cardY}vh))`;
      }

      // --- ANIMAÇÃO DA CARTA EM 8 PARTES + FINALE (CINEMÁTICA) ---
      // Agora a história vai de 50% até 95% do scroll. Os 5% finais são a tela FIM.
      let storyGlobalProgress = Math.max(0, Math.min((currentProgress - 0.50) / 0.45, 1.0));
      
      const parts = document.querySelectorAll('.story-part');
      const numParts = parts.length;
      
      parts.forEach((part, index) => {
        // Cada parte ganha 1/8 do tempo de scroll da Fase 5
        const startP = index / numParts;
        const endP = (index + 1) / numParts;
        
        if (storyGlobalProgress <= startP) {
          // Antes de entrar: escondido
          part.style.opacity = 0;
          // Somente a primeira parte começa lá embaixo para fazer a entrada subindo
          part.style.transform = index === 0 ? `translateY(${window.innerHeight * 0.4}px)` : `translateY(0px)`;
        } else if (storyGlobalProgress >= endP) {
          // Depois de sair: escondido
          part.style.opacity = 0;
          // Todas as partes terminam e somem no centro exato da tela
          part.style.transform = `translateY(0px)`;
        } else {
          // Ativo! Calculamos o progresso local desta parte (de 0.0 a 1.0)
          let localProgress = (storyGlobalProgress - startP) / (endP - startP);
          
          let opacity = 1;
          let y = 0; // O padrão é não se mover (fixo no centro)
          
          // Fade In (de 0% a 10% do tempo desta parte)
          // Fade In (de 0% a 25% do tempo desta parte - Bem mais lento e suave)
          if (localProgress < 0.25) {
            opacity = localProgress / 0.25;
            // Somente a primeira foto tem a animação de subir de fora da tela
            if (index === 0) {
              y = (window.innerHeight * 0.4) * (1 - (localProgress / 0.25));
            }
          } 
          // Fade Out (de 90% a 100% do tempo desta parte - isso cria a "Pausa" antes de sumir!)
          else if (localProgress > 0.90) {
            let exitP = (localProgress - 0.90) / 0.10;
            opacity = 1 - exitP;
            // Fade out acontece puramente por opacidade, com y = 0
          }
          
          part.style.opacity = opacity;
          part.style.transform = `translateY(${y}px)`;
          
          // Lógica Letra por Letra (Máquina de Escrever fluida com o scroll)
          const spans = part.querySelectorAll('.reveal-text span');
          const totalSpans = spans.length;
          
          if (totalSpans > 0) {
            // As letras começam a surgir aos 20% (quase fim do fade) e terminam aos 70%.
            // Isso dá mais tempo para a foto subir devagar antes da carta aparecer correndo.
            let wordRevealProgress = Math.max(0, Math.min((localProgress - 0.20) / 0.50, 1.0));
            let wordsToShow = Math.floor(wordRevealProgress * totalSpans);
            
            spans.forEach((span, i) => {
               if (i < wordsToShow) {
                 span.style.opacity = 1;
                 span.style.transform = 'translateY(0)';
               } else {
                 span.style.opacity = 0;
                 span.style.transform = 'translateY(10px)'; // Entra com um leve sobressalto
               }
            });
          }
        }
      });
      
      // --- ANIMAÇÃO FINAL (TELA "FIM") ---
      // A tela Fim aparece nos últimos 5% do scroll (de 0.95 a 1.0)
      const endScreen = document.getElementById('the-end-screen');
      if (endScreen) {
        if (currentProgress > 0.95) {
          let endP = (currentProgress - 0.95) / 0.05;
          endScreen.style.opacity = endP;
        } else {
          endScreen.style.opacity = 0;
        }
      }
    }

    window.requestAnimationFrame(render);
  };

  updateTrackHeight();
  window.addEventListener('resize', updateTrackHeight);
  textElem.style.transform = `translate(-50%, ${window.innerHeight + 500}px)`;

  // --- PREPARAÇÃO DO TEXTO LETRA POR LETRA ---
  // Transforma cada palavra da carta em um <span> para que o JS possa revelar uma por uma
  document.querySelectorAll('.story-part').forEach(part => {
    const revealElements = part.querySelectorAll('.reveal-text');
    revealElements.forEach(el => {
      const text = el.innerText;
      el.innerHTML = ''; // Limpa o elemento puro
      
      const words = text.split(/(\s+)/); // Divide preservando espaços
      words.forEach(w => {
        if (w.trim().length > 0) {
           const span = document.createElement('span');
           span.innerText = w;
           span.style.opacity = '0';
           span.style.display = 'inline-block';
           span.style.transform = 'translateY(10px)';
           span.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
           el.appendChild(span);
        } else {
           el.appendChild(document.createTextNode(w));
        }
      });
    });
  });

  // Inicia o motor
  render();
}
