import { CheckPoint } from "../repositories/checkPoint.js";
import { animalService } from "../services/AnimalService.js";
import { checkPointService } from "../services/checkPointService.js";

export let availableDevices = [];
export let checkPoints = [];

const checkAnimalsMqtt = (animals) => {
    const allAnimals = animalService.getAllAnimals().data.animals;
    console.log("Entra al checkAnimals");
    console.log(allAnimals);
    let presentAnimals = [];
    animals.forEach(animal => {
        if (allAnimals.includes(animal)) {
          presentAnimals.push(animal);
        }
    });
    console.log(presentAnimals);
    return presentAnimals;
};


export const updateAnimalsInCheckpoint = (checkpointId, animals) => {
    checkPointService.setAnimalsInCheckpoint(checkpointId, checkAnimalsMqtt(animals));
}

export const updateDevicesList = (devices) => {
    availableDevices = [];
    const allAnimals = animalService.getAllAnimals().data.animals;
    const allAnimalsIds = allAnimals.map(animal => animal.id);
    devices.forEach(device => {
        if (!availableDevices.includes(device.id) && !allAnimalsIds.includes(device.id)) {
          availableDevices.push(device.id);
        }
    });
}

export const getAllAvailableDevices = () => {
    if (availableDevices.length != 0) {
        return availableDevices;
    } else {
        throw new Error("No hay dispositivos disponibles");
    }
}

export const addCheckPoint = (checkPointId, animals) => {
    if (!checkPoints.includes(getSpecificCheckPoint(checkPointId))) {
        try {
        const aux = checkPointService.getSpecificCheckPoint(checkPointId);
        checkPoints.push(new CheckPoint(checkPointId, aux.lat, aux.long, aux.description, animals));
        } catch (error) {
            console.log(error.message);
        }
    } else {
        getSpecificCheckPoint(checkPointId).addNotRepeatedAnimals(checkAnimalsMqtt(animals));
    }
}

const getSpecificCheckPoint = (id) => {
    return checkPoints.find(elemento => elemento.id === id);
}

export const getCheckPointsWithAnimals = () => {
    if (checkPoints.length != 0) {
        return checkPoints;
    } else {
        throw new Error("No hay checkpoints disponibles");
    }
}

export const handleData = (data) => {
  const checkpointID = data.checkpointID;
  const packageNum = data.packageNum;
  const totalPackages = data.totalPackages;
  console.log(`Recibido paquete ${packageNum} de ${totalPackages} para el checkpoint ${checkpointID}`);
  const animalsFiltered = data.animals.filter(animal => animal.rssi >= -40);
  addCheckPoint(checkpointID, animalsFiltered);
  updateDevicesList(animalsFiltered);
}