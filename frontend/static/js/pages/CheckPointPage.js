import checkPointsApiHelper from "../helper/api/checkPointsApiHelper.js";
import CheckPointItem from "../components/checkPointItem.js";
import CheckpointStateHelper from "../helper/state/CheckpointStateHelper.js";
import "../helper/api/AxiosRequestInterceptor.js";

export default class CheckPointPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadCheckPoints();
  }

  async loadCheckPoints() {
    try {
      if (!this.checkPoints || this.checkPoints?.length <= 0) {
        const data = await checkPointsApiHelper.getCheckPoints();
        CheckpointStateHelper.setCheckPoints(data.checkPoints);
        this.checkPoints = CheckpointStateHelper.getCheckPoints();
      }
    } catch (e) {
      console.log(e);
      CheckpointStateHelper.setCheckPoints([]);
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

    this.checkPointItems = this.checkPoints?.map((checkPoint) => {
      const checkPointItem = new CheckPointItem(checkPoint);
      checkPointsHtml += checkPointItem.render();
      return checkPointItem;
    });

    checkPointsHtml += "</div>";
    this.container.innerHTML = checkPointsHtml;

    // Agregamos los listeners
    this.checkPointItems.forEach((checkPointItem) => checkPointItem.addListeners());
    
  }
}
