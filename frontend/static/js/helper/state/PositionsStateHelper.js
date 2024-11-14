export default class PositionsStateHelper {
    static getPositions() {
        return JSON.parse(localStorage.getItem("positions"));
    }
    static setPositions(positions) {
        localStorage.setItem("positions", JSON.stringify(positions));
    }
}