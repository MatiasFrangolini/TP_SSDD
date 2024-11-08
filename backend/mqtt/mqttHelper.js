import { animalService } from "../services/AnimalService.js";
import { checkPointService } from "../services/checkPointService.js";

export let availableDevices = [];

const checkAnimalsMqtt = (animals) => {
    const allAnimals = animalService.getAllAnimals().data.animals;
    let presentAnimals = [];
    animals.forEach(animal => {
        if (allAnimals.includes(animal)) {
          presentAnimals.push(animal);
        }
    });
    return presentAnimals;
};


export const updateAnimalsInCheckpoint = (checkpointId, animals) => {
    checkPointService.setAnimalsInCheckpoint(checkpointId, checkAnimalsMqtt(animals));
}

export const updateDevicesList = (devices) => {
    const allAnimals = animalService.getAllAnimals().data.animals;
    devices.forEach(device => {
        if (!availableDevices.includes(device.id) || !allAnimals.includes(device.id)) {
          availableDevices.push(device.id);
        }
    });
}

export const getAllAvailableDevices = () => {
    return availableDevices;
}