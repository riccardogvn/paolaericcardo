// js/main.js


window.initPageScripts = () => {
  const isHome = window.location.hash.includes("home");

  if (isHome) {
    const harp = new Audio("audio/harp.mp3");
    harp.volume = 0.6;
    harp.play().catch(() => {}); // prevent autoplay issues
  }
  // === COUNTDOWN ===
  const weddingDate = new Date("2026-05-01T15:00:00");
  if (window.location.hash.includes('home')) {
    // force restart the animation if revisiting
    document.querySelectorAll('.stage-appear').forEach((el) => {
      el.classList.remove('stage-1', 'stage-2', 'stage-3', 'stage-4');
      void el.offsetWidth; // trigger reflow
      el.classList.add('stage-1', 'stage-2', 'stage-3', 'stage-4');
    });
  }
  const countdownEl = document.querySelector(".countdown");
  

  if (countdownEl) {
    function updateCountdown() {
      const now = new Date();
      const diff = weddingDate - now;
      if (diff <= 0) {
        countdownEl.textContent = "Today is the big day!";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.innerHTML = `
        <span>${days}d</span> :
        <span>${hours}h</span> :
        <span>${minutes}m</span> :
        <span>${seconds}s</span>
      `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  
};


document.addEventListener("DOMContentLoaded", () => {
  
    /* 1) Countdown Timer */
    const weddingDate = new Date("2026-05-01T15:00:00"); // Example wedding date/time
    const countdownEl = document.querySelector(".countdown");
    
    if (countdownEl) {
      function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;
        if (diff <= 0) {
          countdownEl.textContent = "Today is the big day!";
          return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
  
        countdownEl.innerHTML = `
          <span>${days}d</span> :
          <span>${hours}h</span> :
          <span>${minutes}m</span> :
          <span>${seconds}s</span>
        `;
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  
    /* 2) Background Music Controls */


    
    const audio = document.getElementById("bg-music");
  const musicButtons = document.querySelectorAll(".play-music-btn");
  let isPlaying = localStorage.getItem("music-playing") === "true";

  if (isPlaying) {
    audio.volume = 1;
    audio.play().catch(() => {});
  }

  function updateButtons() {
    musicButtons.forEach((btn) => {
      btn.textContent = isPlaying ? "Pause Music ♪" : "Play Music ♪";
      btn.classList.toggle("playing", isPlaying);
    });
  }

  musicButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      localStorage.setItem("music-playing", isPlaying.toString());

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      updateButtons();
    });
  });

  updateButtons();
  
    // 🧠 Menu toggle for mobile
    const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
  menuToggle.style.display = 'block'; // force show menu toggle always

if (menuToggle && navLinks) {
  menuToggle.style.display = 'block'; // force show menu toggle always

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click from firing immediately
    navLinks.classList.toggle("mobile-active");
    menuToggle.classList.toggle("toggled");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-active");
      menuToggle.classList.remove("toggled");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInside = navLinks.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside) {
      navLinks.classList.remove("mobile-active");
      menuToggle.classList.remove("toggled");
      document.body.classList.remove("menu-open");
    }
  });
}

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-active");
      document.body.classList.remove("menu-open"); // 🧼 this line removes the overlay
    });
  });
  

  // 🧠 Form success
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const successMsg = document.createElement("div");
      successMsg.className = "form-success";
      successMsg.textContent = "Grazie! La tua risposta è stata ricevuta.";
      form.parentElement.appendChild(successMsg);
      form.reset();
    });
  }
})
      
const afterOverlay = document.querySelector('body::after');
if (afterOverlay) {
  afterOverlay.style.display = 'none';
}
window.checkPassword = function () {
  const passInput = document.getElementById('galleryPass');
  const galleryContent = document.getElementById('galleryContent');
  const passwordPrompt = document.getElementById('passwordPrompt');

  const correctPassword = 'password'; // secure-ish

  if (passInput.value === correctPassword) {
    passwordPrompt.style.display = 'none';
    galleryContent.style.display = 'block';
  } else {
    alert('Incorrect password. Please try again.');
  }
};