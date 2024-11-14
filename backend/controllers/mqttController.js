import { getAllAvailableDevices, getCheckPointsWithAnimals, createCheckpoints } from "../mqtt/mqttHelper.js";
import { connectMQTT } from "../mqtt/topicMqtt.js";


export const connectMQTTController = (req, res) => {
    connectMQTT();
    createCheckpoints();
};
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