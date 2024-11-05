import checkPointsAPIHelper from "../helper/api/checkPointsAPIHelper.js";
import { navigateTo } from "../index.js";

export default class CheckPointEditFormPage {
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
      const id = event.target.elements.idMac.value.trim();
      const lat = event.target.elements.lat.value.trim();    
      const long = event.target.elements.long.value.trim();
      const description = event.target.elements.description.value.trim();
      await checkPointsAPIHelper.addCheckPoint({id, lat, long, description });
      console.log("entra al add");
      alert("Checkpoint agregado exitosamente!");
      navigateTo("/checkpoints");
      window.removeEventListener("submit", this.handleSubmit);
    } catch (e) {
      console.log(e);
      alert("Error agregando Checkpoint");
    }
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render() {
    const formHtml = `
        <div class= "flex flex-col items-center h-screen my-8">
        <form id="checkpoint-form" class="w-1/4">
            <h2 class="text-2xl my-4 font-bold">Agregar checkpoint</h2>
            <div class="input-container flex flex-col my-2">
                <label for="idMac" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Direccion MAC:</label>
                <input type="text" id="idMac" name="idMac" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" required>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="name" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Latitud:</label>
                <input type="text" id="lat" name="lat" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" required>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="name" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Longitud:</label>
                <input type="text" id="long" name="long" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" required>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="description" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Descripcion:</label>
                <textarea id="description" name="description" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 resize-none" id="inline-full-name" required></textarea>
            </div>
            <button type="submit" form="checkpoint-form" class="form-submit-button shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Agregar</button>
        </form>
        </div>
    `;
    this.container.innerHTML = formHtml;
  }
}