import { getAvailableDevices, getCheckPointsAnimals } from "./mqttController.js";
import { getAllAvailableDevices, getCheckPointsWithAnimals } from "../mqtt/mqttHelper.js";
 export const sseDevices = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      });
      res.write("\n");

      const sendEvent = () => {
        try {
          const devices = getAllAvailableDevices();
          res.write(`data: ${JSON.stringify(devices)}\n\n`);
        } catch (error) {
          res.writeHead(400, "Invalid request!");
          res.end();
        }
      };
  
      const intervalId = setInterval(sendEvent, 5000);
  
      req.on("close", () => {
        clearInterval(intervalId);
      });
      return;
 }

 export const sseCheckpoints = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      });
      res.write("\n");

      const sendEvent = () => {
        getCheckPointsAnimals(req, res);
      };
  
      const intervalId = setInterval(sendEvent, 5000);
  
      req.on("close", () => {
        clearInterval(intervalId);
      });
      return;
 }