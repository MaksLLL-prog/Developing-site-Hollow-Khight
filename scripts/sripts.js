document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const title = document.querySelector(".features-title");
  const featureRows = document.querySelectorAll(".feature-row");
  const trailerTitle = document.querySelector(".trailer-title");

  if (!title && featureRows.length === 0 && !trailerTitle) return;

  if (prefersReducedMotion) {
    [title, ...featureRows, trailerTitle].forEach(el => el?.classList.add("visible"));
    return;
  }

  const showWithDelay = (el, delay) => el && setTimeout(() => el.classList.add("visible"), delay);

  showWithDelay(title, 100);
  featureRows.forEach((row, i) => showWithDelay(row, 300 + i * 200));
  showWithDelay(trailerTitle, 800);

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains("visible")) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
  );

  featureRows.forEach(row => !row.classList.contains("visible") && observer.observe(row));
  trailerTitle && !trailerTitle.classList.contains("visible") && observer.observe(trailerTitle);
});
