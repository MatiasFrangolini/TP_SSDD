import { API_ROUTES } from "../../constants/constants.js";

export default class mqttAPIHelper {
  static async getAvailableDevices() {
    const response = await axios.get(API_ROUTES.DEVICES);
    return response.data;
  }
};