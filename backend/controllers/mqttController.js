import { getAllAvailableDevices, getCheckPointsWithAnimals } from "../mqtt/mqttHelper.js";


export const getAvailableDevices = (req, res) => {
    let devices = [];
    devices = getAllAvailableDevices();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(devices));
};

export const getCheckPointsAnimals = (req, res) => {
    let checkPoints = [];
    checkPoints = getCheckPointsWithAnimals();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(checkPoints));
};