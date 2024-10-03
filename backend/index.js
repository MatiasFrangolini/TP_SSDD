import http from "http";
const HTTP_PORT = 3000;
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
} from "./controllers/AnimalController.js";

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
        getAllControls(req, res);
      } else if (req.method === "POST") {
        addControl(req, res);
      } else if (req.method === "DELETE") {
        deleteControl(req, res);
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
