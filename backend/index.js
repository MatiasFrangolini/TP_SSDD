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
} from "./controllers/checkPointController.js";

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/animals")) {
    console.log('Entra')
    if (req.method === "GET") {
      getAllAnimals(req, res);
    } else if (req.method === "POST") {
      addAnimal(req, res);
    } else if (req.method === "DELETE") {
      deleteAnimal(req, res);
    } else if (req.method === "PATCH"){
      patchAnimal(req, res)
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  } else {
    if (req.url.startsWith("/api/controls")) {
      if (req.method === "GET") {
        getAllCheckPoints(req, res);
      } else if (req.method === "POST") {
        addCheckPoint(req, res);
      } else if (req.method === "DELETE") {
        deleteCheckPoint(req, res);
      }
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  }
});

server.listen(HTTP_PORT, () => {
  console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
});
