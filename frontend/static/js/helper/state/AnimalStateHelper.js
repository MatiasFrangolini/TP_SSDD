export default class AnimalStateHelper {
    static getAnimals() {
        return JSON.parse(sessionStorage.getItem('animals'));
    }
    static setAnimals(animals) {
        sessionStorage.setItem('animals', JSON.stringify(animals));
    }
}