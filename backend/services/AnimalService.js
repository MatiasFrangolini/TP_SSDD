import { getAnimals, writeAnimals } from "../repositories/animalRepository.js";
import { refreshData } from "../mqtt/mqttHelper.js";
import { validate } from "uuid";
import { isNewAnimalValid } from "../validations/animalValidations.js";

export const animalService = {
  addAnimal: (animalData) => {
    console.log(animalData);
    if (!isNewAnimalValid(animalData)) {
      throw new Error("Invalid data");
    }
    let existingAnimals = getAnimals().data.animals;
    let nombre = " ";
    if (animalData.name) 
      nombre = animalData.name;
    const newAnimal = {
      id: animalData.id,
      name: nombre,
      description: animalData.description,
    };
    existingAnimals.push(newAnimal);
    writeAnimals(existingAnimals);
    refreshData(animalData.id);
    return newAnimal;
  },

  getAllAnimals: () => {
    return getAnimals();
  },

  getSpecificAnimal: (id) => {
    var ver = 0;
    const arch = getAnimals();
    var existingAnimals = arch.data.animals;
    var specificAnimal;
    existingAnimals.forEach((animal) => {
      if ((animal.id === id)) {
        ver = 1;
        specificAnimal = animal;
      }
    });
    if (ver == 0) {
      throw new Error("Animal not found");
    }
    return specificAnimal;
  },

  deleteAnimal: (id) => {
    const arch = getAnimals();
    const existingAnimals = arch.data.animals;
    const updatedAnimals = existingAnimals.filter((animal) => animal.id !== id);

    if (existingAnimals.length === updatedAnimals.length) {
      throw new Error("Animal not found");
    }

    writeAnimals(updatedAnimals);
  },

  patchAnimal: (id, animalData) => {
    if (!animalData.name && !animalData.description){
      throw new Error("Body is empty");
    } else {
    var ver = 0;
    const arch = getAnimals();
    var existingAnimals = arch.data.animals;
    existingAnimals.forEach((animal) => {
      if ((animal.id === id)) {
        ver = 1;
        if (animalData.name)
          animal.name = animalData.name;
        if (animalData.description)
          animal.description = animalData.description;
      }
    });
    if (ver == 0) {
      throw new Error("Animal not found");
    }

    writeAnimals(existingAnimals);
  }
  },
};
