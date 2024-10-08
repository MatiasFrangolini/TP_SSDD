import { AnimalService } from "../services/AnimalService.js";

export const addAnimal = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      const newAnimal = AnimalService.addAnimal(parsedBody);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newAnimal));
    } catch (error) {
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};

export const getAllAnimals = (req, res) => {
  const animals = AnimalService.getAllAnimals();
  console.log(animals);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(animals));
};

export const deleteAnimal = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      AnimalService.deleteAnimal(parsedBody.uid);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Animal deleted successfully" }));
    } catch (error) {
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};
