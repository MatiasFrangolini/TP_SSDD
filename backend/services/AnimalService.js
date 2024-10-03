import { getAnimals, writeAnimals } from "../repositories/AnimalRepository.js";
import { v4 as uuidv4 } from "uuid";

export const AnimalService = {
  addAnimal: (animalData) => {
    if (!animalData.name || !animalData.description) {
      throw new Error("Invalid data");
    }

    const existingAnimals = getAnimals();
    const newAnimal = {
      uid: uuidv4(),
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

  deleteAnimal: (uid) => {
    const existingAnimals = getAnimals();
    const updatedAnimals = existingAnimals.filter(
      (animal) => animal.uid !== uid
    );

    if (existingAnimals.length === updatedAnimals.length) {
      throw new Error("Animal not found");
    }

    writeAnimals(updatedAnimals);
  },
};
