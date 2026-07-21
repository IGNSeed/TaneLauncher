const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const yearTarget = document.querySelector("[data-year]");
const tiltRoot = document.querySelector("[data-tilt-root]");
const tiltCard = document.querySelector("[data-tilt-card]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7%", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (tiltRoot && tiltCard && !reducedMotion.matches && window.matchMedia("(hover: hover)").matches) {
  tiltRoot.addEventListener("pointermove", (event) => {
    const bounds = tiltRoot.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 6 - 3}deg) rotateX(${-y * 5 + 1}deg) translate3d(0, -2px, 0)`;
  });

  tiltRoot.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "rotateY(-3deg) rotateX(1deg)";
  });
}
