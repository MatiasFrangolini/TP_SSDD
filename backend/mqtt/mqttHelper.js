import { CheckPoint } from "../repositories/checkPoint.js";
import { animalService } from "../services/AnimalService.js";
import { checkPointService } from "../services/checkPointService.js";

export let availableDevices = [];
export let checkPoints = [];
const checkPointStatus = new Map();

const checkAnimalsMqtt = (animals) => {
    const allAnimals = animalService.getAllAnimals().data.animals;
    let presentAnimals = [];
    // aca estas comparando animals del mqtt (solo tienen id y rssi) con animals del json, no anda.
    // Hay q comparar ids
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

export const updateCheckPoint = (checkPointId, animals) => {
    const devicesNotInJson = animals.filter(animal => !checkAnimalsMqtt(animals).includes(animal));
    console.log("Devices:" + devicesNotInJson);
    console.log("Animals:" + checkAnimalsMqtt(animals));
    getSpecificCheckPoint(checkPointId).addNotRepeatedAnimals(checkAnimalsMqtt(animals));
    getSpecificCheckPoint(checkPointId).addNotRepeatedDevices(devicesNotInJson);
}

export const addCheckPoint = (checkPointId) => {
    try {
    const aux = checkPointService.getSpecificCheckPoint(checkPointId);
    checkPoints.push(new CheckPoint(checkPointId, aux.lat, aux.long, aux.description, [], []));
    } catch (error) {
        console.log(error.message);
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

const resetDevices = (checkpointId) => {
    const checkPoint = getSpecificCheckPoint(checkpointId);
    const devicesCheckPoint = checkPoint.getDevices();
    devicesCheckPoint.forEach(device => {
        availableDevices.pop(device);
    })
    checkPoint.animals = [];
    checkPoint.devices = [];
}

export const handleData = (data) => {
    const checkpointID = data.checkpointID;
    const packageNum = data.packageNum;
    const totalPackages = data.totalPackages;
    const cPoint = getSpecificCheckPoint(checkpointID);

    if (!cPoint) {
        addCheckPoint(checkpointID);
    } else {
        // Aca verifico que paquete corresponde a cada checkpoint, si es el paquete 1, hay que reiniciar los dispositivos de ese checkpoint
        if (packageNum == 1) {
            if (!checkPointStatus.has(checkpointID) || checkPointStatus.get(checkpointID) != 1) {
            checkPointStatus.set(checkpointID, 1);
            resetDevices(checkpointID);
            }
        } else {
            checkPointStatus.set(checkpointID, packageNum);
        }
    }

    console.log(`Recibido paquete ${packageNum} de ${totalPackages} para el checkpoint ${checkpointID}`);

    const animalsFiltered = data.animals.filter(animal => animal.rssi >= -40);
    updateCheckPoint(checkpointID, animalsFiltered);
    updateDevicesList(animalsFiltered);

    
}