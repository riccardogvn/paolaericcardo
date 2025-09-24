const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  let timeouts = [];

  const resetStages = () => {
    menuToggle.classList.remove("step-2", "step-3", "step-4");
    timeouts.forEach(clearTimeout);
    timeouts = [];
  };

  const goToStage = (step) => {
    menuToggle.classList.add(`step-${step}`);
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpening = !navLinks.classList.contains("mobile-active");

    navLinks.classList.toggle("mobile-active");
    document.body.classList.toggle("menu-open");

    resetStages();

    if (isOpening) {
      goToStage(2);
      timeouts.push(setTimeout(() => goToStage(3), 250));
      timeouts.push(setTimeout(() => goToStage(4), 500));
    } else {
      goToStage(3);
      timeouts.push(setTimeout(() => goToStage(2), 250));
      timeouts.push(setTimeout(() => resetStages(), 500));
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-active");
      document.body.classList.remove("menu-open");
      resetStages();
    });
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("mobile-active");
      document.body.classList.remove("menu-open");
      resetStages();
    }
  });
}
