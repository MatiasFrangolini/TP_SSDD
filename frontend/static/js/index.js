import HomePage from "./pages/HomePage.js";
import AnimalFormPage from "./pages/AnimalFormPage.js";
import LoggedInLayout from "./components/layouts/LoggedInLayout.js";

export const navigateTo = (url) => {
  window.history.pushState({}, "", url);
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
  new LoggedInLayout("container");
}

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
