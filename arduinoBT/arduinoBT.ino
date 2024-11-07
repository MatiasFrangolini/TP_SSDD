#include <WiFi.h>
#include <PubSubClient.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <ArduinoJson.h>

// Constants
const char* ssid = "WifiChupete";
const char* password = "12345678";
const char* mqtt_server = "192.168.43.46";
const int mqtt_port = 1883;
const char* checkpointID = "macWemos";

WiFiClient espClient;
PubSubClient client(espClient);

BLEScan* pBLEScan;
const int scanTime = 5; // In seconds

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Connect to MQTT broker
  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  // Initialize BLE
  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan(); // Create BLE scan object
}

void loop() {
  // Scan for Bluetooth devices
  Serial.println("Scanning for BLE devices...");
  BLEScanResults * foundDevices = pBLEScan->start(scanTime, false);

  DynamicJsonDocument doc(1024); // Cambiar el tamaño por si no entra el buffer
  doc["checkpointID"] = checkpointID;

  // Loop through found devices
for (int i = 0; i < foundDevices->getCount(); i++) {
    BLEAdvertisedDevice device = foundDevices->getDevice(i);
    if (device.getRSSI() >= -80) {
      JsonObject animal = animals.createNestedObject();
      animal["id"] = device.getAddress().toString().c_str();
      animal["rssi"] = device.getRSSI();
    }
  }
  
  char* output;
  serializeJson(doc, output);
  pBLEScan->clearResults(); // Clear scan results

  if (client.connected()) {
    client.publish("checkpoint", output.c_str());
    Serial.println("Published to MQTT:");
    Serial.println(output.c_str());
  } else {
    Serial.println("MQTT connection lost. Attempting to reconnect...");
    if (client.connect("ESP32Client")) {
      Serial.println("Reconnected to MQTT");
    }
  }

  // Wait 5 seconds before next scan
  delay(5000);
}
