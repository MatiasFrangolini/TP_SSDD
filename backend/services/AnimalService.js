import { getAnimals, writeAnimals } from "../repositories/AnimalRepository.js";
import { v4 as uuidv4 } from "uuid";

export const AnimalService = {
  addAnimal: (animalData) => {
    if (!animalData.name || !animalData.description || !animalData.id) {
      throw new Error("Invalid data");
    }

    const existingAnimals = getAnimals();
    const newAnimal = {
      id: animalData.id,
      name: animalData.name,
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
    console.log(existingAnimals); 
    const updatedAnimals = existingAnimals.filter(
      (animal) => animal.id !== id
    );

    if (existingAnimals.length === updatedAnimals.length) {
      throw new Error("Animal not found");
    }

    writeAnimals(updatedAnimals);
  },
};
