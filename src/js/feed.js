import { getSingleElements } from "./dom.js";


(() => {
  const subNavbarOpen = getSingleElements(".sub-navbar-open");
  const subNavbar = getSingleElements(".sub-navbar");
  const subNavbarMenu = getSingleElements(".sub-navbar__menu");

  subNavbarOpen.addEventListener("click", (e) => {
    subNavbar.classList.add("active");
  });

  window.addEventListener("click", (e) => {
    if (!subNavbar.contains(e.target) && e.target !== subNavbarOpen) {
      console.log(e.target);
      subNavbar.classList.remove("active");
    }
  });
})();
