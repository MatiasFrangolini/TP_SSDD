import { handleData } from "../mqtt/mqttHelper.js";

//const mqtt = require("mqtt");
import mqtt from "mqtt";
export const connectMQTT = () => {
  const client = mqtt.connect("mqtt://192.168.100.167:1883");
  const topic = "checkpoint";

  console.log("Conectando a MQTT...");
  client.on("connect", () => {
    console.log("Conectado a MQTT");
    client.subscribe(topic, (err) => {
      if (!err) {
        console.log("Suscripción exitosa al tópico ", topic)
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log("Mensaje recibido en el tópico:", topic);
    let data = JSON.parse(message.toString());
    console.log(data);
    handleData(data);
  });

  client.on('error', (error) => {
    console.error("Error en la conexión MQTT:", error);
    client.end();
  });

  client.on('close', () => {
    console.log("Conexión MQTT cerrada");
  });
}

