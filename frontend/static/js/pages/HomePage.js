import AnimalsAPIHelper from "../helper/api/AnimalsApiHelper.js";
import AnimalItem from "../components/AnimalItem.js";

export default class HomePage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadAnimals();
  }

  async loadAnimals() {
    try {
      if (!this.animals || this.animals?.length <= 0) {
        const data = await AnimalsAPIHelper.getAnimals();
        this.animals = data.animals;
      }
    } catch (e) {
      console.log(e);
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
      animalsHtml += animalItem.render(); // Añadimos el HTML de cada animal al DOM
      return animalItem;
    });

    animalsHtml += "</div>";
    this.container.innerHTML = animalsHtml;

    // Agregamos los listeners de eliminación después de renderizar el HTML
    this.animalItems.forEach((animalItem) => animalItem.addListeners());
    
  }
}
