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
        <h3 class="bg-gray text-center my-8 font-bold text-2xl">Animales disponibles:</h3>
        <div class="grid grid-cols-4 gap-4">
    `;
    this.animals?.forEach((animal) => {
      animalsHtml += new AnimalItem(animal).render();
    });
    animalsHtml += "</div>";
    this.container.innerHTML = animalsHtml;
  }
}
