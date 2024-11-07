import { getAllAnimals } from "../services/AnimalService.js";
import { getSpecificCheckPoint, setAnimalsInCheckpoint } from "../services/checkPointService.js";

const checkAnimalsMqtt = (animals) => {
    const allAnimals = getAllAnimals();
    let presentAnimals = [];
    for (let i = 0; i < animals.length; i++) {
        if (allAnimals.contains(animals[i].id)) {
            presentAnimals.push(animals[i]);
        }
    };
    return presentAnimals;
};


export const updateAnimalsInCheckpoint = (checkpointId, animals) => {
    setAnimalsInCheckpoint(checkpointId, checkAnimalsMqtt(animals));
}