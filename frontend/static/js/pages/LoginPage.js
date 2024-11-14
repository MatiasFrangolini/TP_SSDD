import { navigateTo } from "../index.js";
import AuthApiHelper from "../helper/api/AuthApiHelper.js";
import { validateLogin } from "../helper/validations/authValidations.js";
import AuthStateHelper from "../helper/state/AuthStateHelper.js";
import UserStateHelper from "../helper/state/UserStateHelper.js";
import "../helper/api/AxiosRequestInterceptor.js";

export default class LoginPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadForm();
  }

  async loadForm() {
    this.render();
    this.addListener();
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      const username = event.target.elements.username.value.trim();
      const password = event.target.elements.password.value.trim();
      if (validateLogin(username, password)) {
        const userData = await AuthApiHelper.login({ username, password });
        const { accessToken, refreshToken, ...rest } = userData;
        UserStateHelper.setUser(rest);
        AuthStateHelper.setAuth({ accessToken, refreshToken });
      }
      navigateTo("/");
      window.removeEventListener("submit", this.handleSubmit);
    } catch (e) {
      console.log(e);
      alert("Error al iniciar sesion");
    }
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render() {
    const formHtml = `
        <div class= "flex flex-col items-center h-screen my-8">
        <form id="login-form" class="w-1/4">
            <h2 class="text-2xl my-4 font-bold">Inicia sesión para continuar</h2>
            <div class="input-container flex flex-col my-2">
                <label for="username" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Usuario:</label>
                <input type="text" id="username" name="username" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" required>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="password" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Contraseña:</label>
                <input type="password" id="password" name="password" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" required>
            </div>
            <button type="submit" form="login-form" class="form-submit-button shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Iniciar sesión</button>
        </form>
        </div>
    `;
    this.container.innerHTML = formHtml;
  }
}