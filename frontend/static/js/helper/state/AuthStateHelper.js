export default class AuthStateHelper {
    static getAuth() {
        return JSON.parse(localStorage.getItem('auth'));
    }

    static setAuth(auth) {
        localStorage.setItem('auth', JSON.stringify(auth));
    }

    static getAccessToken() {
        const auth = this.getAuth();
        return auth?.accessToken;
    }

    static getRefreshToken() {
        const auth = this.getAuth();
        return auth?.refreshToken;
    }

    static deleteAuth() {
        localStorage.removeItem('auth');
    }
}