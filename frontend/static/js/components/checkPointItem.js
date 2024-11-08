import checkPointsAPIHelper from "../helper/api/checkPointsApiHelper.js";
import { navigateTo } from "../index.js";

export default class CheckPointItem {
  constructor({ id, lat, long, description }) {
    this.id = id;
    this.lat = lat;
    this.long = long;
    this.description = description;
  }

  async deleteCheckPoint(id) {
    try {
      await checkPointsAPIHelper.deleteCheckPoint(id);
      navigateTo("/checkpoints");
    } catch (e) {
      console.log(e);
      alert("Error eliminando Animal");
    }
  }

  async editCheckPoint(id) {
    try {
      navigateTo("/editCheckPoint/" + id);
    } catch (e) {
      console.log(e);
      alert("Error al editar animal");
    }
  }

  addListeners() {
    const buttonDelete = document.getElementById(`delete-${this.id}`);
    const buttonEdit = document.getElementById(`edit-${this.id}`);
    if (buttonDelete) {
      buttonDelete.addEventListener("click", () => {
        this.deleteCheckPoint(this.id);
      });
    }
    if (buttonEdit) {
      buttonEdit.addEventListener("click", () => {
        this.editCheckPoint(this.id);
      });
    }
  }


  render() {
    return `
            <div class="flex p-5 rounded-lg border border-black mx-10 my-5">
            <div class="flex flex-col text-center w-full">
                <h4 style="font-weight: bold; margin-bottom: 10px;">${this.id}</h5>
                <p style="color: grey;">${this.description}</p>
            </div>
            <button id="edit-${this.id}" class="w-1/6 mx-2 flex items-center justify-center rounded-md border  p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-blue-300 focus:bg-gray-300 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 494.936 494.936" xml:space="preserve" stroke="#000000" stroke-width="40" class="w-4 h-4">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <g> <g> 
                <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path> <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path> 
                </g> </g> </g>
              </svg>
            </button>
            <button id="delete-${this.id}" class=" w-1/6 flex items-center justify-center rounded-md border border p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-red-300 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>
            </button>
            </div>
        `;
  }
}
