import AnimalsApiHelper from "../helper/api/AnimalsApiHelper.js";
import { navigateTo } from "../index.js";
import { validateNewAnimal } from "../helper/validations/animalValidations.js";

export default class AnimalFormPage {
  constructor(selector, id) {
    this.container = document.getElementById(selector);
    this.loadForm(id);
  }

  async loadForm(id) {
    this.render(id);
    this.addListener();
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      const id = event.target.elements.bluetooth.value.trim();
      const name = event.target.elements.name.value.trim();
      const description = event.target.elements.description.value.trim();
      if (validateNewAnimal({ description })) {
        await AnimalsApiHelper.addAnimal({ id, name, description });
        alert("Animal agregado exitosamente!");
        navigateTo("/");
      }
      window.removeEventListener("submit", this.handleSubmit);
    } catch (e) {
      console.log(e);
      alert("Error agregando Animal");
    }
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render(id) {
    const formHtml = `
        <div class= "flex flex-col items-center h-screen my-8">
        <form id="animal-form" class="w-1/4">
            <h2 class="text-2xl my-4 font-bold">Nuevo animal</h2>
            <div class="input-container flex flex-col my-2">
                <label for="bluetooth" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Bluetooth id:</label>
                <input type="text" value="${id}" id="bluetooth" name="bluetooth" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" disabled>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="name" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Nombre:</label>
                <input type="text" id="name" name="name" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name">
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="description" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Descripcion:</label>
                <textarea id="description" name="description" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 resize-none" id="inline-full-name" required></textarea>
            </div>
            <button type="submit" form="animal-form" class="form-submit-button shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Enviar</button>
        </form>
        </div>
    `;
    this.container.innerHTML = formHtml;
  }
}
