import http, { get } from "http";
import dotenv from "dotenv";
dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

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


const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204); 
    res.end();
    return;
  }
  if (req.url === "/api/events/availableDevices" && req.method === "GET") {
    sseDevices(req, res);
    return;
  }
  if (req.url === "/api/events/positions" && req.method === "GET") {
    sseCheckpoints(req, res);
    return;
  }

  if (req.url.startsWith("/api/animals/positions")) {
    if (req.method === "GET") {
      getCheckPointsAnimals(req, res);
    }
  } else if (req.url.startsWith("/api/animals")) {
    if (req.method === "GET") {
      getAllAnimals(req, res);
    } else if (req.method === "POST") {
      addAnimal(req, res);
    } else if (req.method === "DELETE") {
      deleteAnimal(req, res);
    } else if (req.method === "PATCH") {
      patchAnimal(req, res);
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  } else if (req.url.startsWith("/api/checkpoints")) {
    if (req.method === "GET") {
      getAllCheckPoints(req, res);
    } else if (req.method === "POST") {
      addCheckPoint(req, res);
    } else if (req.method === "DELETE") {
      deleteCheckPoint(req, res);
    } else if (req.method === "PATCH"){
      patchCheckPoint(req, res);
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  } else if (req.url.startsWith("/api/availableDevices")) {
    if (req.method === "GET") {
      getAvailableDevices(req, res);
    }
  } else {
    res.writeHead(404, "Ruta no encontrada");
    res.end();
  }
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
  connectMQTTController();
});
