import checkPointsAPIHelper from "../helper/api/checkPointsAPIHelper.js";
import { navigateTo } from "../index.js";

export default class CheckPointEditFormPage {
  constructor(selector, id) {
    this.container = document.getElementById(selector);
    this.loadForm(id);
  }

  async loadForm(id) {
    const data = await this.getData(id);
    this.render(data);
    this.addListener();
  }

  async getData(id) {
    try {
      const data = await checkPointsAPIHelper.getCheckPointById(id);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();
      const id = event.target.elements.idMac.value.trim();
      const lat = event.target.elements.lat.value.trim();    
      const long = event.target.elements.long.value.trim();
      const description = event.target.elements.description.value.trim();
      await checkPointsAPIHelper.editCheckPoint({id, lat, long, description });
      alert("Checkpoint editado exitosamente!");
      navigateTo("/checkpoints");
      window.removeEventListener("submit", this.handleSubmit);
    } catch (e) {
      console.log(e);
      alert("Error editando Checkpoint");
    }
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render(data) {
    const formHtml = `
        <div class= "flex flex-col items-center h-screen my-8">
        <form id="checkpoint-edit-form" class="w-1/4">
            <h2 class="text-2xl my-4 font-bold">Editar checkpoint</h2>
            <div class="input-container flex flex-col my-2">
                <label for="bluetooth" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Direccion MAC:</label>
                <input type="text" id="idMac" value="${data.id}" name="idMac" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" disabled>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="name" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Latitud:</label>
                <input type="text" id="lat" value="${data.lat}" name="lat" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" disabled>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="name" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Longitud:</label>
                <input type="text" id="long" value="${data.long}" name="long" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" disabled>
            </div>
            <div class="input-container flex flex-col my-2">
                <label for="description" class="input-label block text-gray-500 font-bold mb-1 md:mb-0 pr-4">Descripcion:</label>
                <textarea id="description" name="description" class="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 resize-none" id="inline-full-name" required>${data.description}</textarea>
            </div>
            <button type="submit" form="checkpoint-edit-form" class="edit-form-submit-button shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Editar</button>
        </form>
        </div>
    `;
    this.container.innerHTML = formHtml;
  }
}
