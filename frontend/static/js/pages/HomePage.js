import AnimalsAPIHelper from "../helper/api/AnimalsApiHelper.js";
import AnimalItem from "../components/AnimalItem.js";
import AnimalStateHelper from "../helper/state/AnimalStateHelper.js";
import "../helper/api/AxiosRequestInterceptor.js";

export default class HomePage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadAnimals();
  }

  async loadAnimals() {
    try {
      if (!this.animals || this.animals?.length <= 0) {
        const data = await AnimalsAPIHelper.getAnimals();
        AnimalStateHelper.setAnimals(data.animals);
        this.animals = AnimalStateHelper.getAnimals();
      }
    } catch (e) {
      console.log(e);
      AnimalStateHelper.setAnimals([]);
      this.animals = [];
    } finally {
      this.render();
    }
  }

  render() {
    let animalsHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">Animales registrados:</h3>
      <div class="grid grid-cols-4 gap-4">
    `;

    // Creamos los objetos AnimalItem y los almacenamos en una lista
    this.animalItems = this.animals?.map((animal) => {
      const animalItem = new AnimalItem(animal);
      animalsHtml += animalItem.render();
      return animalItem;
    });

    animalsHtml += "</div>";
    this.container.innerHTML = animalsHtml;

    // Agregamos los listeners
    this.animalItems.forEach((animalItem) => animalItem.addListeners());
    
  }
}
