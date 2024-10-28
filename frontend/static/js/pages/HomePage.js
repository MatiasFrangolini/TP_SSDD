import AnimalsAPIHelper from "../helper/api/AnimalsApiHelper.js";
import AnimalItem from "../components/AnimalItem.js";

export default class HomePage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadGames();
  }

  async loadGames() {
    try {
      if (!this.animals || this.animals?.length <= 0) {
        const data = await AnimalsAPIHelper.getAnimals();
        this.animals = data;
        console.log(this.animals);
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
        <h3 class="bg-gray">Animales disponibles:</h3>
        <div>
    `;
    this.animals?.forEach((animal) => {
      animalsHtml += new AnimalItem(animal).render();
    });
    animalsHtml += "</div>";
    this.container.innerHTML = animalsHtml;
  }
}
