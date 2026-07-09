/* ================================================================
   ALY'S BIRTHDAY SITE â€” script.js ðŸ’•
   Tela 1: Countdown â†’ Tela 2: Login animado â†’ Tela 3: Principal
================================================================ */

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONFIGURAÃ‡ÃƒO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIRTHDAY   = new Date('2026-08-24T00:00:00');
const LOGIN_USER = 'Ally';
const LOGIN_PASS = 'Presente';

// ID do YouTube â€” Lugar Secreto (Gabriela Rocha)
// Para trocar: substitua apenas o VIDEO_ID abaixo
const YT_VIDEO_ID = 'rJOaLFiXcOY';

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

  // Fade out
  from.style.transition = 'opacity 0.5s ease';
  from.style.opacity    = '0';

  setTimeout(() => {
    from.style.transition = '';
    from.style.opacity    = '';
    from.classList.remove('active');
    from.style.display    = 'none';

    // Prepare new screen hidden
    to.classList.add('active');
    to.style.opacity    = '0';
    to.style.transition = 'none';
    void to.offsetHeight;

    // Fade in
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
    // AniversÃ¡rio chegou!
    ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    clearInterval(countdownInterval);
    // Vai para login apÃ³s 1.5s
    setTimeout(() => {
      switchScreen('screen-countdown', 'screen-login', () => {
        setTimeout(startLoginAnimation, 700);
      });
    }, 1500);
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      switchScreen('screen-login', 'screen-main', () => { startMusic(); showMusicBtn(); });
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
let ytPlayer  = null;
let ytReady   = false;
let ytPlaying = false;
let ytPending = false; // true se o player estiver pronto mas a pÃ¡gina ainda nÃ£o abriu

// Chamado automaticamente pelo YouTube API
window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    videoId:     YT_VIDEO_ID,
    playerVars: {
      autoplay:       1,
      loop:           1,
      playlist:       YT_VIDEO_ID,
      controls:       0,
      disablekb:      1,
      fs:             0,
      modestbranding: 1,
      rel:            0,
    },
    events: {
      onReady: function (e) {
        ytReady = true;
        e.target.setVolume(40);
        if (ytPending) {
          e.target.playVideo();
          ytPlaying = true;
          updateMusicBtn();
        }
      },
      onStateChange: function (e) {
        // Se o navegador bloqueou o autoplay, aguarda o usuÃ¡rio clicar
        if (e.data === YT.PlayerState.PAUSED && ytPending) {
          ytPlaying = false;
          updateMusicBtn();
        }
        if (e.data === YT.PlayerState.PLAYING) {
          ytPlaying = true;
          updateMusicBtn();
        }
      }
    }
  });
};

function startMusic() {
  ytPending = true;
  if (ytReady && ytPlayer) {
    ytPlayer.playVideo();
    ytPlaying = true;
    updateMusicBtn();
  }
  // Se o player ainda nÃ£o estÃ¡ pronto, ytPending=true farÃ¡ ele tocar quando estiver
}

function toggleMusic() {
  if (!ytPlayer || !ytReady) return;
  if (ytPlaying) {
    ytPlayer.pauseVideo();
    ytPlaying = false;
  } else {
    ytPlayer.playVideo();
    ytPlaying = true;
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn  = document.getElementById('music-btn');
  const icon = document.getElementById('music-icon');
  if (!btn || !icon) return;
  if (ytPlaying) {
    btn.classList.add('playing');
    icon.textContent  = 'ðŸŽµ';
    btn.querySelector('.music-label').textContent = 'â™ª Pausar';
  } else {
    btn.classList.remove('playing');
    icon.textContent  = 'â¸ï¸';
    btn.querySelector('.music-label').textContent = 'â™ª Tocar';
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
  startHearts();
  initLoginBtn();
  initTabs();
  initModals();
  initMusicBtn();
  initTicker();

  if (!handleDevMode()) {
    startCountdown();
  }
});





