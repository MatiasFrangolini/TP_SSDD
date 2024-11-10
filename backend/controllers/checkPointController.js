import { parse } from "uuid";
import { checkPointService } from "../services/checkPointService.js";

export const addCheckPoint = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      const newCheckPoint = checkPointService.addCheckPoint(parsedBody);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newCheckPoint));
      
    } catch (error) {
      console.log(error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};

export const getAllCheckPoints = (req, res) => {
  const parametros = req.url.split('/');
  let checkPoints;
  try {
    if (parametros[3]){
      const id = parametros[3]
      checkPoints = checkPointService.getSpecificCheckPoint(id);
    } else {
      checkPoints = checkPointService.getAllCheckPoints();
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(checkPoints));
  } catch (error) {
    console.log(error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
  }
  
};


export const deleteCheckPoint = (req, res) => {
  const parametros = req.url.split('/');
  const id = parametros [3];
  try {
      checkPointService.deleteCheckPoint(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Checkpoint deleted successfully" }));
    } catch (error) {
      console.log(error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
    }
}

export const patchCheckPoint = (req, res) => {
  const parametros = req.url.split('/');
  const id = parametros[3];
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      checkPointService.patchCheckPoint(id,parsedBody);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Check Point updated successfully" }));
    } catch (error) {
      console.log(error.message);
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};
