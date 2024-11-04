import http from "http";
const HTTP_PORT = 3000;
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

const server = http.createServer((req, res) => {
  // Configuración de encabezados CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir todos los orígenes (cambiar '*' por un origen específico si es necesario)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejo de solicitudes OPTIONS (pre-flight para CORS)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // Respuesta sin contenido para solicitudes OPTIONS
    res.end();
    return;
  }

  if (req.url.startsWith("/api/animals")) {
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
  } else if (req.url.startsWith("/api/controls")) {
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
  } else {
    res.writeHead(404, "Ruta no encontrada");
    res.end();
  }
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
