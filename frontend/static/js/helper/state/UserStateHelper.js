export default class UserStateHelper {
    static getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static deleteUser() {
        localStorage.removeItem('user');
    }
}