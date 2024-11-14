import { animalService as animalService } from "../services/AnimalService.js";
import { isNewAnimalValid } from "../validations/animalValidations.js";

export const addAnimal = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      const newAnimal = animalService.addAnimal(parsedBody);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newAnimal));
      
    } catch (error) {
      console.log("Error: " + error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};

export const getAllAnimals = (req, res) => {
  const parametros = req.url.split('/');
  let animals;
  try {
    if (parametros[3]){
      const id = parametros[3];
      animals = animalService.getSpecificAnimal(id);
    } else {
      animals = animalService.getAllAnimals();
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(animals));
  } catch (error) {
    res.writeHead(400, "Invalid request!");
    res.end();
  }
  
};

export const deleteAnimal = (req, res) => {
  const parametros = req.url.split('/');
  const id = parametros[3];
    try {
      animalService.deleteAnimal(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Animal deleted successfully" }));
    } catch (error) {
      res.writeHead(400, "Invalid request!");
      res.end();
    }
};

export const patchAnimal = (req, res) => {
  const parametros = req.url.split('/');
  const id = parametros[3];
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      animalService.patchAnimal(id,parsedBody);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Animal updated successfully" }));
    } catch (error) {
      console.log(error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};
