import AuthStateHelper from "../state/AuthStateHelper.js";

axios.interceptors.request.use(function (config) {
    const token = AuthStateHelper.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});