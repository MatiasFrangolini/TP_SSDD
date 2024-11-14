import { animalService as animalService } from "../services/AnimalService.js";
import { isNewAnimalValid } from "../validations/animalValidations.js";

export const addAnimal = (req, res) => {
  try {
    const newAnimal = animalService.addAnimal(req.body);
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).send("Animal could not be added"); 
  }
};


export const getAllAnimals = (req, res) => {
  try {
    const { id } = req.params;
    let animals;
    if (id){
      animals = animalService.getSpecificAnimal(id);
    } else {
      animals = animalService.getAllAnimals();
    }
    res.status(201).json(animals);
  } catch (e) {
    res.status(400).send("Invalid request!");
  }
};

export const deleteAnimal = (req, res) => {
    try {
      const {id} = req.params;  
      animalService.deleteAnimal(id);
      res.status(201).json({ message: "Animal deleted successfully" });
    } catch (error) {
      res.status(400).send("Invalid request!"); 
    }
};

export const patchAnimal = (req, res) => {
    try {
      const { id } = req.params;
      animalService.patchAnimal(id,req.body);
      res.status(201).json({ message: "Animal updated successfully" });
    } catch (error) {
      res.status(400).send("Invalid request!");
    }
};
