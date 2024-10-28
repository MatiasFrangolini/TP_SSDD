import HomePage from "./pages/HomePage.js";
import AnimalFormPage from "./pages/AnimalFormPage.js";

export const navigateTo = (url) => {
  history.pushState({}, "", url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();

  navigateTo(event.target.href);
};

function loadLayout() {
  /*
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (isAuth) {
      new LoggedInLayout("container");
      return;
  }
  new AuthLayout("container");
  */
  new HomePage("layout-content");
}

function loadPage() {
  loadLayout();
  if (location.pathname === "/") {
    console.log("HOLA");
    new HomePage("layout-content");
  } else if (location.pathname === "/add") {
    console.log("add");
    new AnimalFormPage("layout-content");
  } /*else if (location.pathname === "/login") {
    new LoginPage("layout-content");
  }*/
}

window.route = route;
window.onpopstate = loadPage;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  loadPage();
});
