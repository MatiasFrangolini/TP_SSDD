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
        console.log(this.animals);
      }
    } catch (e) {
      console.log("catch");
      console.log(e);
      this.animals = [];
    } finally {
      this.render();
    }
  }

  render() {
    let animalsHtml = `
        <h3 class="bg-gray text-center">Animales disponibles:</h3>
        <div class="flex flex-wrap justify-center">
    `;
    this.animals?.forEach((animal) => {
      animalsHtml += new AnimalItem(animal).render();
    });
    animalsHtml += "</div>";
    this.container.innerHTML = animalsHtml;
  }
}
