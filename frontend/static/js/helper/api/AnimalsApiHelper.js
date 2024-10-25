import { API_ROUTES } from "../../constants/constants";

export default class AnimalsApiHelper {
  static getAnimals() {
    const response = axios.get(API_ROUTES.ANIMALS);
    return response.data;
  }
}
