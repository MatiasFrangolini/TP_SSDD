import { API_ROUTES } from "../../constants/constants.js";

export default class AnimalsApiHelper {
  static getAnimals() {
    const response = axios.get(API_ROUTES.ANIMALS);
    return response.data;
  }
}
