import checkPointsAPIHelper from "../helper/api/checkPointsAPIHelper.js";
import CheckPointItem from "../components/checkPointItem.js";

export default class HomePage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadCheckPoints();
  }

  async loadCheckPoints() {
    try {
      if (!this.checkPoints || this.checkPoints?.length <= 0) {
        const data = await checkPointsAPIHelper.getCheckPoints();
        this.checkPoints = data.checkPoints;
      }
    } catch (e) {
      console.log(e);
      this.checkPoints = [];
    } finally {
      this.render();
    }
  }

  render() {
    let checkPointsHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">CheckPoints disponibles:</h3>
      <div class="grid grid-cols-4 gap-4">
    `;

    // Creamos los objetos AnimalItem y los almacenamos en una lista
    this.checkPointItems = this.checkPoints?.map((checkPoint) => {
      const checkPointItem = new CheckPointItem(checkPoint);
      checkPointsHtml += checkPointItem.render(); // Añadimos el HTML de cada animal al DOM
      return checkPointItem;
    });

    checkPointsHtml += "</div>";
    this.container.innerHTML = checkPointsHtml;

    // Agregamos los listeners de eliminación después de renderizar el HTML
    this.checkPointItems.forEach((checkPointItem) => checkPointItem.addListeners());
    
  }
}
