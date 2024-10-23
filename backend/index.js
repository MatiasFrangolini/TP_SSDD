import http from "http";
const HTTP_PORT = 3000;
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
} from "./controllers/AnimalController.js";

import {
  addControlPoint,
  deleteControlPoint,
  getAllControlPoints,
} from "./controllers/PuntoControlController.js";

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/animals")) {
    //console.log('Entra')
    if (req.method === "GET") {
      getAllAnimals(req, res);
    } else if (req.method === "POST") {
      addAnimal(req, res);
    } else if (req.method === "DELETE") {
      deleteAnimal(req, res);
    } else {
      res.writeHead(404, "Ruta no encontrada");
      res.end();
    }
  } else {
    if (req.url.startsWith("/controls")) {
      if (req.method === "GET") {
        getAllControlPoints(req, res);
      } else if (req.method === "POST") {
        addControlPoint(req, res);
      } else if (req.method === "DELETE") {
        deleteControlPoint(req, res);
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
