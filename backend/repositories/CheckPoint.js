export class CheckPoint {

    constructor(id, lat, long, description, animals) {
        this.id = id;
        this.animals = animals;
        this.lat = lat;
        this.long = long;
        this.description = description;
    }    

    setAnimals = (animals) => {
        this.animals = animals;
    }

    addNotRepeatedAnimals = (animals) => {
        animals.forEach(animal => {
            if (!this.animals.includes(animal)) {
                this.animals.push(animal);
            }
        });
    }

    getAnimals = () => {
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