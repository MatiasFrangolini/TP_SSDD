export default class DevicesStateHelper {
    static setDevices(devices) {
        localStorage.setItem("devices", JSON.stringify(devices));
    }
    static getDevices() {
        return JSON.parse(localStorage.getItem("devices"));
    }
    
}