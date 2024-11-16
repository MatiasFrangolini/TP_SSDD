import mqttAPIHelper from "../helper/api/mqttAPIHelper.js";
import PositionItem from "../components/PositionItem.js";
import AnimalPositionsItem from "../components/AnimalPositionsItem.js";
import AnimalsApiHelper from "../helper/api/AnimalsApiHelper.js";
import PositionsStateHelper from "../helper/state/PositionsStateHelper.js";
import "../helper/api/AxiosRequestInterceptor.js";

export default class AnimalPositionsPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadPositions();
    this.checkpoints = [];
    this.suscribeToEvent();
  }

  async loadPositions() {
    try {
      if (!this.checkpoints || this.checkpoints?.length <= 0) {
        const data = await mqttAPIHelper.getPositions();
        PositionsStateHelper.setPositions(data);
        this.checkpoints = [];
        PositionsStateHelper.getPositions().forEach(element => {
          this.checkpoints.push(element);
        });
      }
    } catch (e) {
      PositionsStateHelper.setPositions([]);
      this.checkpoints = [];
    } finally {
      this.render();
    }
  }

  async render() {
    let animalsInZoneMap = new Map();
    let checkPointsHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">CheckPoints disponibles:</h3>
      <div class="grid grid-cols-4 gap-4 items-start">
    `;

    this.positionItems = await Promise.all(
      this.checkpoints?.map(async (checkPoint) => {
        let zoneHtml = "";
        const positionItem = new PositionItem(checkPoint.id, checkPoint.lat, checkPoint.long, checkPoint.description);
        zoneHtml += positionItem.render();
        const animalPositionsItems = await Promise.all(
          checkPoint.animals?.map(async (animal) => {
            const animalData = await AnimalsApiHelper.getAnimalById(animal.id);
            positionItem.addAnimal(animalData);
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
    //this.container.innerHTML = checkPointsHtml;
    const checkpointsContainer = document.querySelector('#checkpoints-container');
    if (checkpointsContainer) {
        checkpointsContainer.innerHTML = checkPointsHtml;
    } else {
        this.container.innerHTML = `
          <div id="map" style="height: 400px;"></div>
          <div id="checkpoints-container">${checkPointsHtml}</div>
        `;
    }
    if (!this.map) {
      this.map = L.map('map', {
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        zoomControl: false,
      }).setView([-38.010263, -57.638990], 16);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      this.positionItems.forEach((positionItem) => {
        const marker = L.marker([positionItem.lat, positionItem.long]).addTo(this.map);
        marker.bindPopup("<h2 style='font-weight: bold;'>"+ positionItem.description + "</h2>"+ "<br>"
          + positionItem.lat + ", " + positionItem.long + " <br><br>" +"<h2 style='font-weight: bold;'> Animales: </h2>"+ positionItem.getAnimalsHtml());
      })
    }    
  }

  renderMap() {

  }


  suscribeToEvent() {
    const eventSource = new EventSource("http://localhost:3000/api/events/positions");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.checkpoints = data;
      this.render();
    };

    eventSource.onerror = (error) => {
      console.error("Error en SSE:", error);
    };
  };
}