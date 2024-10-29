import { API_ROUTES } from "../../constants/constants.js";

export default class AnimalsApiHelper {
  static async getAnimals() {
    const response = await axios.get(API_ROUTES.ANIMALS);
    return response.data.data;
  }
}
