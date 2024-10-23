import { controlPointService } from "../services/PuntoControlService.js";

export const addControlPoint = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        const newControlPoint = controlPointService.addControlPoint(parsedBody);
  
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newControlPoint));
      } catch (error) {
        res.writeHead(400, "Invalid request!");
        res.end();
      }
    });
  };
  
  export const getAllControlPoints = (req, res) => {
    const controlPoints = controlPointService.getAllAnimals();
    console.log(controlPoints);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(controlPoints));
  };
  
  export const deleteControlPoint = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        controlPointService.deleteControlPoint(parsedBody.uid);
  
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Control point deleted successfully" }));
      } catch (error) {
        res.writeHead(400, "Invalid request!");
        res.end();
      }
    });
  };