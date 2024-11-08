import { updateAnimalsInCheckpoint, updateDeviceList } from "../mqtt/mqttHelper.js";

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.43.46:1883");
const topic = "checkpoint";

client.on("connect", () => {
  client.subscribe("devices", (err) => {
    if (!err) {
      console.log("Se ha conectado correctamente.")
    }
    client.subscribe(topic, (err) => {
      if (err) {
          console.error("Error al suscribirse al tópico:", err);
      }
  });
  });
});

client.on("message", (topic, message) => {
  console.log("Mensaje recibido en el tópico:", topic);
  console.log(message.toString());
  let data = JSON.parse(message.toString());
  const checkpointID = data.checkpointID;
  const animalsFiltered = data.animals.filter(animal => animal.RSSI >= -40);
  console.log(animalsFiltered);
  
  updateAnimalsInCheckpoint(checkpointID, animalsFiltered);
  updateDeviceList(animalsFiltered);
});

client.on('error', (error) => {
  console.error("Error en la conexión MQTT:", error);
  client.end();
});

client.on('close', () => {
  console.log("Conexión MQTT cerrada");
});
