import HomePage from "./pages/HomePage.js";
import AnimalFormPage from "./pages/AnimalFormPage.js";
import LoggedInLayout from "./components/layouts/LoggedInLayout.js";
import AnimalEditFormPage from "./pages/AnimalEditFormPage.js";
import CheckPointPage from "./pages/CheckPointPage.js";
import CheckPointEditFormPage from "./pages/CheckPointEditFormPage.js";
import AvailableDevicesPage from "./pages/AvailableDevicesPage.js";
import AnimalPositionsPage from "./pages/AnimalPositionsPage.js";
import AuthStateHelper from "./helper/state/AuthStateHelper.js";
import AuthLayout from "./components/layouts/AuthLayout.js";
import LoginPage from "./pages/LoginPage.js";
import "./helper/api/AxiosRequestInterceptor.js";

export const navigateTo = (url) => {
  window.history.pushState({}, "", url);
  loadPage();
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  const isAuth = !!AuthStateHelper.getAccessToken;
  if (!isAuth && event.target.href !== "/login") {
    navigateTo("/login");
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
  } else if (location.pathname === "/login") {
    new LoginPage("layout-content");
  } else if (location.pathname.startsWith("/addAnimal")) {
    const id = location.pathname.split("/")[2];
    new AnimalFormPage("layout-content", id);
  } else if (location.pathname === "/checkpoints") {
    new CheckPointPage("layout-content");
  } else if (location.pathname.startsWith("/editAnimal")) {
    const id = location.pathname.split("/")[2];
    new AnimalEditFormPage("layout-content", id);
  }else if (location.pathname.startsWith("/editCheckPoint")) {
    const id = location.pathname.split("/")[2];
    new CheckPointEditFormPage("layout-content", id);
  } else if (location.pathname === "/availableDevices") {
    new AvailableDevicesPage("layout-content");
  } else if (location.pathname === "/positions") {
    new AnimalPositionsPage("layout-content");
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
