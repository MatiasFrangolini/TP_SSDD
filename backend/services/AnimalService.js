import { getAnimals, writeAnimals } from "../repositories/animalRepository.js";

export const animalService = {
  addAnimal: (animalData) => {
    if (!animalData.description || !animalData.id) {
      throw new Error("Invalid data");
    }
    let existingAnimals = getAnimals().data.animals;
    let nombre = " ";
    if (animalData.name) nombre = animalData.name;
    const newAnimal = {
      id: animalData.id,
      name: nombre,
      description: animalData.description,
    };
    existingAnimals.push(newAnimal);
    writeAnimals(existingAnimals);

    return newAnimal;
  },

  getAllAnimals: () => {
    return getAnimals();
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
    var ver = 0;
    const arch = getAnimals();
    var existingAnimals = arch.data.animals;
    existingAnimals.forEach((animal) => {
      if ((animal.id = id)) {
        ver = 1;
        animal.name = animalData.name;
        animal.description = animalData.description;
      }
    });
    if (ver == 0) {
      throw new Error("Animal not found");
    }

    writeAnimals(existingAnimals);
  },
};
