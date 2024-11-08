export class CheckPoint {

    constructor(id, animals) {
        this.id = id;
        this.animals = animals;
    }    

    setAnimals = (animals) => {
        this.animals = animals;
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