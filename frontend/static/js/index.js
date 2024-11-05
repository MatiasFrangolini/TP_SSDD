import HomePage from "./pages/HomePage.js";
import AnimalFormPage from "./pages/AnimalFormPage.js";
import LoggedInLayout from "./components/layouts/LoggedInLayout.js";
import AnimalEditFormPage from "./pages/AnimalEditFormPage.js";
import CheckPointPage from "./pages/CheckPointPage.js";
import CheckPointEditFormPage from "./pages/CheckPointEditFormPage.js";
import CheckPointFormPage from "./pages/CheckPointFormPage.js";

export const navigateTo = (url) => {
  window.history.pushState({}, "", url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  const isAuth = !!AuthStateHelper.getAccessToken();
    if (!isAuth && event.target.href !== '/login') {
        navigateTo('/login');
    } else {
        navigateTo(event.target.href);
    }
};

function loadLayout() {
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (isAuth) {
      new LoggedInLayout("container");
      return;
  }
  new AuthLayout("container");
}

function loadPage() {
  loadLayout();
  const isAuth = !!AuthStateHelper.getAccessToken();
  if (!isAuth) {
      history.pushState({}, "", "/login");
      return new LoginPage('layout-content');
  }
  if (location.pathname === "/") {
    new HomePage("layout-content");
  } else if (location.pathname === "/addAnimal") {
    new AnimalFormPage("layout-content");
  } else if (location.pathname === "/checkpoints") {
    new CheckPointPage("layout-content");
  } else if (location.pathname === "/addCheckpoint") {
    new CheckPointFormPage("layout-content");
  } else if (location.pathname.startsWith("/editAnimal")) {
    const id = location.pathname.split("/")[2];
    new AnimalEditFormPage("layout-content", id);
  } else if (location.pathname.startsWith("/editCheckPoint")) {
    const id = location.pathname.split("/")[2];
    new CheckPointEditFormPage("layout-content", id);
  }
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
