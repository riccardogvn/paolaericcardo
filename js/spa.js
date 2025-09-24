// js/spa.js

function loadPage(url, push = true) {
  const contentEl = document.getElementById("spa-content");
  const bgOverlay = document.getElementById("bg-overlay");

  if (!contentEl) {
    console.error("❌ spa-content element not found!");
    return;
  }

  const filename = url.split("/").pop();
  const cleanUrl = `pages/${filename}`;

  fetch(cleanUrl, { cache: "no-store" })
    .then(res => res.text())
    .then(html => {
      contentEl.innerHTML = `<div class="content-wrapper page-fade">${html}</div>`;
      if (push) history.pushState({ url: filename }, "", `#${filename}`);
      window.scrollTo(0, 0);

      // Background switching
      // const imagePath = `url('images/bg-${filename.replace('.php', '')}.jpg')`;
      // bgOverlay.style.backgroundImage = imagePath;

      // Trigger page-specific logic
      if (typeof window.initPageScripts === "function") {
        window.initPageScripts();
      };


      if (filename === "gallery.php" && typeof window.initGalleryPage === "function") {
        window.initGalleryPage();
      }
    })
    .catch(err => {
      contentEl.innerHTML = "<p>Oops! Failed to load the page.</p>";
      console.error(err);
    });

  console.log("👉 Caricamento SPA:", cleanUrl);
}

window.loadPage = loadPage;

window.addEventListener("DOMContentLoaded", () => {
  const initialHash = window.location.hash.replace(/^#/, '') || 'home.php';
  loadPage(initialHash, false);

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.dataset.spa !== undefined) {
      e.preventDefault();
      const pageUrl = link.getAttribute("href");
      const filename = pageUrl.split("/").pop();
      loadPage(filename);
    }
  });

  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.url) {
      loadPage(e.state.url, false);
    }
  });
});


// ───────── Global mobile menu toggle (event delegation) ─────────
// js/spa.js (in fondo al file, subito dopo il listener esistente)
document.addEventListener("click", e => {
  const toggle = e.target.closest(".menu-toggle");
  const nav    = document.querySelector(".nav-links");

  if (toggle) {
    // click sul ☰ → toggle
    nav.classList.toggle("mobile-active");
    toggle.classList.toggle("toggled");
    document.body.classList.toggle("menu-open");
    return;
  }

  if (e.target.closest(".nav-links a")) {
    // click su uno dei link del menu → chiudi sempre
    nav.classList.remove("mobile-active");
    document.querySelector(".menu-toggle").classList.remove("toggled");
    document.body.classList.remove("menu-open");
    return;
  }

  if (!e.target.closest(".nav-links")) {
    // click fuori dal menu → chiudi
    nav.classList.remove("mobile-active");
    document.querySelector(".menu-toggle").classList.remove("toggled");
    document.body.classList.remove("menu-open");
  }
});
