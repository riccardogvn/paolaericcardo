// js/main.js
window.initPageScripts = () => {
  console.log("✅ initPageScripts eseguito!");

  const hash = window.location.hash;
  const isHome = hash.includes("home");

  // ——— Timeline animation ———
  document.querySelectorAll(".timeline-item").forEach((item, i) => {
    item.classList.remove("visible");
    setTimeout(() => item.classList.add("visible"), i * 400);
  });

  // ——— Countdown (solo in home) ———
  if (isHome) {
    const harp = new Audio("audio/harp.mp3");
    harp.volume = 0.6;
    harp.play().catch(() => {});

    const countdownEl = document.querySelector(".countdown");
    if (countdownEl) {
      const weddingDate = new Date("2026-05-01T15:00:00");
      function updateCountdown() {
        const now  = new Date();
        const diff = weddingDate - now;
        if (diff <= 0) {
          countdownEl.textContent = "Today is the big day!";
          return;
        }
        const days    = Math.floor(diff / 86400000);
        const hours   = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdownEl.innerHTML = 
          `<span>${days}d</span> : <span>${hours}h</span> : ` +
          `<span>${minutes}m</span> : <span>${seconds}s</span>`;
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  }};



  window.initGalleryPage = function() {
    const form       = document.getElementById("uploadForm");
    const galleryDiv = document.getElementById("galleryImages");
    const cloudDiv   = document.getElementById("tagCloud");
    if (!form) return;
    // link ai nuovi controlli
    const chooseBtn   = document.getElementById('chooseBtn');
    const captureBtn  = document.getElementById('captureBtn');
    const fileInput   = document.getElementById('fileInput');
    const cameraInput = document.getElementById('cameraInput');

    // Apri file picker
    chooseBtn.addEventListener('click', () => {
      fileInput.click();
    });

    // Apri fotocamera (solo mobile)
    captureBtn.addEventListener('click', () => {
      cameraInput.click();
    });

    // (Non serve altro: al submit del form, FormData(form) includerà entrambi i campi file)
    const previewContainer = document.getElementById('previewContainer');

// mostra anteprima ogni volta che cambia uno dei due input
[fileInput, cameraInput].forEach(input => {
  input.addEventListener('change', () => {
    previewContainer.innerHTML = '';            // svuota
    Array.from(input.files).forEach(file => {
      const url = URL.createObjectURL(file);
      const img = document.createElement('img');
      img.src = url;
      previewContainer.appendChild(img);
    });
  });
});
    
  
    // 1) Caricamento iniziale
    loadImages();
  
    // 2) Intercetta submit
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
    
      console.log('Invio queste immagini:', fd.getAll('images[]'));  // DEBUG
    
      fetch("api/upload.php", { method: "POST", body: fd })
        .then(r => r.json())
        .then(json => {
          console.log('Risposta server:', json);    // DEBUG
          if (json.success) {
            alert('Upload completato con successo 🎉');
            form.reset();
            previewContainer.innerHTML = '';        // rimuovi anteprime
            loadImages();
          } else {
            alert("Errore server: " + json.error);
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          alert("Errore di connessione");
        });
    });
  
    // 3) Funzione per caricare e disegnare
    function loadImages() {
      fetch("api/fetch_images.php")
        .then(r => r.json())
        .then(images => {
          galleryDiv.innerHTML = "";
          cloudDiv.innerHTML   = "";
          const freq = {};
          images.forEach(img => {
            // thumbnail
            const item = document.createElement("div");
            item.className = "gallery-item";
            item.innerHTML = `
              <img src="uploads/${img.filename}" data-full="uploads/${img.filename}">
              <p><strong>${img.username}</strong> [${img.moment}]: ${img.comment}</p>
            `;
            galleryDiv.appendChild(item);
            // conta parole
            img.comment.split(/\s+/).forEach(w => {
              w = w.replace(/[^\p{L}\p{N}]/gu,"").toLowerCase();
              if (w) freq[w] = (freq[w]||0)+1;
            });
            // lightbox click
            item.querySelector("img").onclick = () => {
              const lb = document.getElementById("lightbox-overlay");
              const im = document.getElementById("lightbox-image");
              im.src = item.querySelector("img").dataset.full;
              lb.style.display = "flex";
            };
          });
          // tag cloud
          const max = Math.max(...Object.values(freq),1);
          for (let w in freq) {
            const el = document.createElement("span");
            el.textContent = w;
            el.style.cssText = `
              font-size:${12 + (freq[w]/max)*18}px;
              color:hsl(${Math.random()*360},70%,50%);
              margin:4px;
            `;
            cloudDiv.appendChild(el);
          }
          // chiudi lightbox
          document.getElementById("lightbox-close").onclick = () => {
            document.getElementById("lightbox-overlay").style.display = "none";
          };
        })
        .catch(console.error);
    }
  };
  
