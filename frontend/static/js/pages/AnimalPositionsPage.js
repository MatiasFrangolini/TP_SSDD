import mqttAPIHelper from "../helper/api/mqttAPIHelper.js";
import PositionItem from "../components/PositionItem.js";
import AnimalPositionsItem from "../components/AnimalPositionsItem.js";
import AnimalsApiHelper from "../helper/api/AnimalsApiHelper.js";

export default class AnimalPositionsPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadPositions();
    this.checkpoints = [];
  }

  async loadPositions() {
    try {
      if (!this.checkpoints || this.checkpoints?.length <= 0) {
        const data = await mqttAPIHelper.getPositions();
        console.log(data);
        data.forEach(element => {
          this.checkpoints.push(element);
        });
      }
    } catch (e) {
      console.log(e);
      this.checkpoints = [];
    } finally {
      this.render();
    }
  }

  async render() {
    let checkPointsHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">CheckPoints disponibles:</h3>
      <div class="grid grid-cols-4 gap-4">
    `;

    this.positionItems = await Promise.all(
      this.checkpoints?.map(async (checkPoint) => {
        let zoneHtml = "";
        const positionItem = new PositionItem(checkPoint.id, checkPoint.lat, checkPoint.long, checkPoint.description);
        zoneHtml += positionItem.render();
        const animalPositionsItems = await Promise.all(
          checkPoint.animals?.map(async (animal) => {
            const animalData = await AnimalsApiHelper.getAnimalById(animal.id);
            const animalPositionsItem = new AnimalPositionsItem(animalData.name, animalData.description);
            return animalPositionsItem.render();
          }));
        zoneHtml += animalPositionsItems.join("");
        zoneHtml += "</div>";
        zoneHtml += "</div>";
        checkPointsHtml += zoneHtml;
        return positionItem;
      }));
    
    checkPointsHtml += "</div>";
    this.container.innerHTML = checkPointsHtml;

    
  }
}