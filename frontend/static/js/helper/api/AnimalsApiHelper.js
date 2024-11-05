import { API_ROUTES } from "../../constants/constants.js";

export default class AnimalsApiHelper {
  static async getAnimals() {
    const response = await axios.get(API_ROUTES.ANIMALS);
    return response.data.data;
  }

  static async addAnimal(animalData) {
    const response = await axios.post(API_ROUTES.ANIMALS, animalData);
    return response.data;
  }

  static async deleteAnimal(id) {
    const response = await axios.delete(`${API_ROUTES.ANIMALS}/${id}`);
    return response.data;
  }

  static async editAnimal(animalData) {
    const response = await axios.patch(API_ROUTES.ANIMALS, animalData);
    return response.data;
  }

  static async getAnimalById(id) {
    const response = await axios.get(`${API_ROUTES.ANIMALS}/${id}`);
    return response.data;
  }
}
