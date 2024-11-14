import express from "express";	
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const port = process.env.HTTP_PORT || 3000;

import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  patchAnimal,
} from "./controllers/animalController.js";

import {
  addCheckPoint,
  deleteCheckPoint,
  getAllCheckPoints,
  patchCheckPoint,
} from "./controllers/checkPointController.js";

import { getAvailableDevices, getCheckPointsAnimals, connectMQTTController} from "./controllers/mqttController.js";
import { sseCheckpoints, sseDevices } from "./controllers/sseController.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());  

/* Rutas para eventos */
app.get("/api/events/availableDevices", (req, res) => {
  sseDevices(req, res);
});

app.get("/api/events/positions", (req, res) => {
  sseCheckpoints(req, res);
});

/* Rutas para animales*/
app.get("/api/animals/:id?", (req, res) => {
  getAllAnimals(req, res);
});

app.post("/api/animals", (req, res) => {
  addAnimal(req, res);
});

app.delete("/api/animals/:id", (req, res) => {
  deleteAnimal(req, res);
});

app.patch("/api/animals/:id", (req, res) => {
  patchAnimal(req, res);
});

/* Rutas para checkpoints*/
app.get("/api/checkpoints/:id?", (req, res) => {
  getAllCheckPoints(req, res);
});

app.post("/api/checkpoints", (req, res) => {
  addCheckPoint(req, res);
});

app.delete("/api/checkpoints/:id", (req, res) => {
  deleteCheckPoint(req, res);
});

app.patch("/api/checkpoints/:id", (req, res) => {
  patchCheckPoint(req, res);
});

/* Rutas para posicion y dispositivos disponibles */
app.get("/api/animals/positions", (req, res) => {
  getCheckPointsAnimals(req, res);
});


app.get("/api/availableDevices", (req, res) => {
  getAvailableDevices(req, res);
});

app.options("*", (req, res) => {
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  connectMQTTController();
})
