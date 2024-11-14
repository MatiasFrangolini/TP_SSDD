import mqttAPIHelper from "../helper/api/mqttAPIHelper.js";
import DeviceItem from "../components/DeviceItem.js";
import DevicesStateHelper from "../helper/state/DevicesStateHelper.js";
import "../helper/api/AxiosRequestInterceptor.js";

export default class AvailableDevicesPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadDevices();
    this.suscribeToEvent();
  }

  async loadDevices() {
    try {
      if (!this.devices || this.devices?.length <= 0) {
        const data = await mqttAPIHelper.getAvailableDevices();
        DevicesStateHelper.setDevices(data);
        this.devices = DevicesStateHelper.getDevices();
      }
    } catch (e) {
      console.log(e);
      DevicesStateHelper.setDevices([]);
      this.devices = [];
    } finally {
      this.render();
    }
  }

  render() {
    let devicesHtml = `
      <h3 class="bg-gray text-center my-8 font-bold text-2xl">Animales disponibles para dar de alta:</h3>
      <div class="grid grid-cols-4 gap-4">
    `;

    // Creamos los objetos DeviceItem y los almacenamos en una lista
    this.deviceItems = this.devices?.map((device) => {
      const deviceItem = new DeviceItem(device);
      devicesHtml += deviceItem.render();
      return deviceItem;
    });

    devicesHtml += "</div>";
    this.container.innerHTML = devicesHtml;

    this.deviceItems.forEach((deviceItem) => deviceItem.addListeners());
  }
  

  suscribeToEvent() {
    const eventSource = new EventSource("http://localhost:3000/api/events/availableDevices");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.devices = data;
      this.render();
    };

    eventSource.onerror = (error) => {
      console.error("Error en SSE:", error);
    };
  };
}