import http from "http";
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  patchAnimal,
} from "./controllers/AnimalController.js";

import {
  addCheckPoint,
  deleteCheckPoint,
  getAllCheckPoints,
  patchCheckPoint,
} from "./controllers/checkPointController.js";

import { AuthController } from "./controllers/AuthController.js";
import { authenticate } from "./middleware/AuthMiddleware.js";

const HTTP_PORT = 3000;

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
  const authController = new AuthController();
  console.log(req.url);

  if (req.url.startsWith("/api/animals")) {
    const isAuth = authenticate(req, res);
    if (!isAuth) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No autorizado' }));
      return;
    }
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
    const isAuth = authenticate(req, res);
    if (!isAuth) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No autorizado' }));
      return;
    }
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
  } else if (req.url.startsWith("/api/login")) {
    if (req.method === "POST") {
      console.log("login");
      authController.login(req, res);
    }
  } else if (req.url.startsWith("/api/refresh")) {
    if (req.method === "POST") {
      authController.refresh(req, res);
    }
  } else {
    res.writeHead(404, "Ruta no encontrada");
    res.end();
  } 
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
