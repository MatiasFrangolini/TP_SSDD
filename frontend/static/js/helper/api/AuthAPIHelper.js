import { API_ROUTES } from '../../constants/constants.js';

export default class AuthAPIHelper {
    static async login({ id, password }) {
        const response = await axios.post(API_ROUTES.LOGIN, { id, password });
        return response.data;
    }
}