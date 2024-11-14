import { API_ROUTES } from '../../constants/constants.js';

export default class AuthApiHelper {
    static async login({ username, password }) {
        const response = await axios.post(API_ROUTES.LOGIN, { username, password });
        return response.data;
    }

    static async refresh({ refreshToken }) {
        const response = await axios.post(API_ROUTES.REFRESH, { refreshToken });
        return response.data;
    }
}