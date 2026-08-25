// Capa de interacción mínima.
// El HTML/CSS siguen siendo utilizables aunque se quite el JavaScript.

const menuButton = document.querySelector(".menu-toggle");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
  });
}

// Reveal opcional al hacer scroll.
// Agrega class="reveal" a cualquier elemento que quieras animar.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Filtro de artículos por categoría (Clima, Salud, IA, Energía).
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");

    projects.forEach((project) => {
      const matches = filter === "all" || project.dataset.category === filter;
      project.classList.toggle("is-hidden", !matches);
    });
  });
});
