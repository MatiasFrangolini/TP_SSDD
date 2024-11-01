const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://192.168.43.46:1883");

client.on("connect", () => {
  client.subscribe("devices", (err) => {
    if (!err) {
      console.log("Se ha conectado correctamente.")
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log("Mensaje recibido en el tópico:", topic);
  console.log(message.toString());
});
