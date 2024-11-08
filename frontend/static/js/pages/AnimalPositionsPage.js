import checkPointsApiHelper from "../helper/api/checkPointsApiHelper.js";
import PositionItem from "../components/PositionItem.js";
import AnimalPositionsItem from "../components/AnimalPositionsItem.js";

export default class AnimalPositionsPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadPositions();
  }

  async loadPositions() {
    try {
      if (!this.checkpoints || this.checkpoints?.length <= 0) {
        const data = await checkPointsApiHelper.getCheckPoints();
        this.checkpoints = data.checkpoints;
      }
    } catch (e) {
      console.log(e);
      this.checkpoints = [];
    } finally {
      this.render();
    }
  }

  render() {
    let checkPointsHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">CheckPoints disponibles:</h3>
      <div class="grid grid-cols-4 gap-4">
    `;

    this.positionItems = this.checkpoints?.map((checkPoint) => {
      const positionItem = new PositionItem(checkPoint.description);
      checkPointsHtml += positionItem.render();
      this.animalPositionsItems = checkPoint.animals?.map((animal) => {
        const animalPositionsItem = new AnimalPositionsItem(animal.name, animal.description);
        checkPointsHtml += animalPositionsItem.render();
      });
      return positionItem;
    });

    

    checkPointsHtml += "</div>";
    this.container.innerHTML = checkPointsHtml;

    
  }
}