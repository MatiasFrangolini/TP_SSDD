import mqttAPIHelper from "../helper/api/mqttAPIHelper.js";
import DeviceItem from "../components/DeviceItem.js";

export default class AvailableDevicesPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadDevices();
  }

  async loadDevices() {
    try {
      if (!this.devices || this.devices?.length <= 0) {
        const data = await mqttAPIHelper.getAvailableDevices();
        this.devices = data;
      }
    } catch (e) {
      console.log(e);
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
      console.log(device);
      const deviceItem = new DeviceItem(device);
      devicesHtml += deviceItem.render();
      return deviceItem;
    });

    devicesHtml += "</div>";
    this.container.innerHTML = devicesHtml;

    this.deviceItems.forEach((deviceItem) => deviceItem.addListeners());
  }
  
}