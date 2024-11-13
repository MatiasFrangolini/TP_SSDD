export class CheckPoint {

    constructor(id, lat, long, description, animals, devices) {
        this.id = id;
        this.animals = animals;
        this.devices = devices;
        this.lat = lat;
        this.long = long;
        this.description = description;
    }    

    setAnimals = (animals) => {
        this.animals = animals;
    }

    setDevices = (devices) => {
        this.devices = devices;
    }

    getDevices = () => {
        if (!this.devices) {
            this.devices = [];
        }
        return this.devices;
    }

    addNotRepeatedAnimals = (animals) => {
        animals.forEach(animal => {
            if (!this.animals.includes(animal)) {
                this.animals.push(animal);
            }
        });
    }

    addNotRepeatedDevices = (devices) => {
        devices.forEach(device => {
            if (!this.devices.includes(device)) {
                this.devices.push(device);
            }
        });
    }

    getAnimals = () => {
        if (!this.animals) {
            this.animals = [];
        }
        return this.animals;
    }
}





/*
En el request interceptor hay que tener:
const now = new Date().getTime();
Refrescar con esa fecha el token


Checkpoint {
    packageNum id
    totalPackets id
    macCheckPoint string
    animals: [
        devId
        RSSI  ]
    }

*/