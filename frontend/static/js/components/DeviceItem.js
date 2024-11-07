import mqttAPIHelper from "../helper/api/mqttAPIHelper.js";
import { navigateTo } from "../index.js";

export default class DeviceItem {
  constructor(id) {
    this.id = id;
  }

  async addAnimal(id) {
    try {
      navigateTo("/addAnimal/" + id);
    } catch (e) {
      console.log(e);
      alert("Error al agregar animal");
    }
  }

  addListeners() {
    const buttonAdd = document.getElementById(`add-${this.id}`);
    if (buttonAdd) {
      buttonAdd.addEventListener("click", () => {
        console.log("Botón de agregar presionado para:", this.id);
        this.addAnimal(this.id);
      });
    }
  }


  render() {
    return `
            <div class="flex p-5 rounded-lg border border-black mx-10 my-5">
            <div class="flex flex-col text-center w-full">
                <h4 style="font-weight: bold; margin-bottom: 10px;">${this.id}</h5>
            </div>
            <button id="add-${this.id}" class="w-1/6 mx-2 flex items-center justify-center rounded-md border  p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-blue-300 focus:bg-gray-300 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <svg class="w-4 h-4" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M12 6V18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12H18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            </div>
        `;
  }
}