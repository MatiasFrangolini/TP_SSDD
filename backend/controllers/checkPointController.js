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
      console.log(newCheckPoint);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newCheckPoint));
    } catch (error) {
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};

export const getAllCheckPoints = (req, res) => {
  const parametros = req.url.split('/');
  let checkPoints;
  if (parametros[3]){
    const id = parametros[3]
    checkPoints = checkPointService.getSpecificCheckPoint(id);
  } else {
    checkPoints = checkPointService.getAllCheckPoints();
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(checkPoints));
};

export const deleteCheckPoint = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      checkPointService.deleteCheckPoint(parsedBody.uid);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Checkpoint deleted successfully" })
      );
    } catch (error) {
      res.writeHead(400, "Invalid request!");
      res.end();
    }
  });
};
