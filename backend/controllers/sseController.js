import { getAllAvailableDevices, getCheckPointsWithAnimals } from "../mqtt/mqttHelper.js";
 export const sseDevices = (req, res) => {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const sendEvent = () => {
        try {
          const devices = getAllAvailableDevices();
          res.write(`data: ${JSON.stringify(devices)}\n\n`);
        } catch (error) {
          res.write(`error: ${error.message}\n\n`);
        }
      };
  
      const intervalId = setInterval(sendEvent, 2000);
  
      req.on("close", () => {
        clearInterval(intervalId);
      });
      return;
 }

 export const sseCheckpoints = (req, res) => {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const sendEvent = () => {
        try {
            const checkpoints = getCheckPointsWithAnimals();
            res.write(`data: ${JSON.stringify(checkpoints)}\n\n`);
          } catch (error) {
            res.write(`error: ${error.message}\n\n`);
          }
      };
  
      const intervalId = setInterval(sendEvent, 2000);
  
      req.on("close", () => {
        clearInterval(intervalId);
      });
      return;
 }