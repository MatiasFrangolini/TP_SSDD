import { addAnimal, getAllAnimals, deleteAnimal, patchAnimal } from "../controllers/AnimalController.js";
import { getCheckPointsAnimals, getAvailableDevices } from "../controllers/mqttController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";
import express from "express";

const app = express();

app.post("/animals", authenticate, addAnimal);
app.get("/animals/:id?", authenticate, getAllAnimals);
app.delete("/animals/:id", authenticate, deleteAnimal);
app.patch("/animals/:id", authenticate, patchAnimal);
app.get("/animals/positions", authenticate, getCheckPointsAnimals);
app.get("/availableDevices", authenticate, getAvailableDevices);

export default app;