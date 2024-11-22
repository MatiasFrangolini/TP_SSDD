import { API_ROUTES } from "../../constants/constants.js";


export default class checkPointsApiHelper {
  static async getCheckPoints() {
    const response = await axios.get(API_ROUTES.CHECKPOINTS);
    return response.data;
  }

  static async addCheckPoint(checkPointData) {
    const response = await axios.post(API_ROUTES.CHECKPOINTS, checkPointData);
    return response.data;
  }

  static async deleteCheckPoint(id) {
    const response = await axios.delete(`${API_ROUTES.CHECKPOINTS}/${id}`);
    return response.data;
  }

  static async editCheckPoint(checkPointData) {
    const response = await axios.patch(`${API_ROUTES.CHECKPOINTS}/${checkPointData.id}`, {name: checkPointData.name, description: checkPointData.description});
    return response.data;
  }

  static async getCheckPointById(id) {
    const response = await axios.get(`${API_ROUTES.CHECKPOINTS}/${id}`);
    return response.data;
  }
}
