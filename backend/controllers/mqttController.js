import { getAllAvailableDevices, getCheckPointsWithAnimals } from "../mqtt/mqttHelper.js";


export const getAvailableDevices = (req, res) => {
    let devices = [];
    try {
        devices = getAllAvailableDevices();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(devices));
    } catch (error) {
        res.writeHead(400, "Invalid request!");
        res.end();
    }
   
};

export const getCheckPointsAnimals = (req, res) => {
    let checkPoints = [];
    try {
        checkPoints = getCheckPointsWithAnimals();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(checkPoints));
    } catch (error) {
        res.writeHead(400, "Invalid request!");
        res.end();
    }
};