/* import { getSingleElements } from "./dom.js";

(() => {
  const subNavbarOpen = getSingleElements(".sub-navbar-open");
  const subNavbar = getSingleElements(".sub-navbar");
  const subNavbarMenu = getSingleElements(".sub-navbar__menu");
  subNavbarOpen.addEventListener("click", (e) => {
    if (!subNavbar.classList.contains("active")) {
      subNavbar.classList.add("active");
    } else {
      subNavbar.classList.remove("active");
    }
  });

  window.addEventListener("click", (e) => {
    if (!subNavbar.contains(e.target) && e.target !== subNavbarOpen) {
      subNavbar.classList.remove("active");
    }
  });
})(); */
