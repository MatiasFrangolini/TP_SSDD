import { HomePage } from "./pages/home.js";
import { AnimalFormPage } from "./pages/animalForm.js";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();

  navigateTo(event.target.href);
};

function loadPage() {
  loadLayout();
  if (location.pathname === "/") {
    new HomePage("layout-content");
  } else if (location.pathname === "/add") {
    new AnimalFormPage("layout-content");
  } /*else if (location.pathname === "/login") {
    new LoginPage("layout-content");
  }*/
}

window.route = route;
window.onpopstate = loadPage;

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  loadPage();
});
