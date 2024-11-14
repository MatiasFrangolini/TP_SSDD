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
        res.status(200).json(devices);
    } catch (error) {
        res.status(400).send("Invalid request!");
    }
   
};


export const getCheckPointsAnimals = (req, res) => {
    let checkPoints = [];
    try {
        checkPoints = getCheckPointsWithAnimals();
        res.status(200).json(checkPoints);
    } catch (error) {
        res.status(400).send("Invalid Request!");
    }
};