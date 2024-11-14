import AuthStateHelper from "../state/AuthStateHelper.js";

axios.interceptors.request.use(function (config) {
    //const now = new Date().getTime();
    const token = AuthStateHelper.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, async function (error) {
    if (error?.response?.status === 401) {
        try {
            const refreshToken = AuthStateHelper.getRefreshToken();
            const accessToken = await AuthApiHelper.refresh({ refreshToken });
            AuthStateHelper.setAuth({ accessToken, refreshToken });
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
        } catch (e) {
            console.log("No se pudo refrescar el token" + e);
            return Promise.reject(e);
        }
    }
    return Promise.reject(error);
});