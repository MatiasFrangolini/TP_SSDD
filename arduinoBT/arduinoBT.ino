#include <WiFi.h>
#include <PubSubClient.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <ArduinoJson.h>

// Constants
const char* ssid = "dlink";
const char* password = "";
const char* mqtt_server = "192.168.42.60";
const int mqtt_port = 1883;
const size_t maxPayloadSize = 256;
const size_t bufferSize = 2048;

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
    //Serial.println(F("Connecting to WiFi..."));
  }
  Serial.println(F("Connected to WiFi"));

  // Connect to MQTT broker
  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected()) {
    //Serial.println(F("Connecting to MQTT..."));
    if (client.connect("ESP32Client")) {
      Serial.println(F("Connected to MQTT"));
    } else {
      Serial.print(F("Failed with state "));
      Serial.print(F(client.state()));
      delay(2000);
    }
  }

  // Initialize BLE
  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan(); // Create BLE scan object
}

void loop() {
  // Scan for Bluetooth devices
  Serial.println(F("Scanning for BLE devices..."));
  BLEScanResults * foundDevices = pBLEScan->start(scanTime, false);

  int totalDevices = foundDevices->getCount();
  Serial.println(totalDevices);
  int devicesPerPacket = 5; 
  int totalPackages = (totalDevices + devicesPerPacket - 1) / devicesPerPacket;
  DynamicJsonDocument doc(bufferSize);
  // Enviar cada paquete
  for (int packageNum = 1; packageNum <= totalPackages; packageNum++) {
    doc["packageNum"] = packageNum;
    doc["totalPackages"] = totalPackages;
    doc["checkpointID"] = WiFi.macAddress();
    JsonArray animalsArray = doc.createNestedArray("animals");

    int start = (packageNum - 1) * devicesPerPacket;
    int end = min(start + devicesPerPacket, totalDevices);

    for (int i = start; i < end; i++) {
      BLEAdvertisedDevice device = foundDevices->getDevice(i);
      if (device.getRSSI() >= -80) {
        JsonObject animal = animalsArray.createNestedObject();
        animal["id"] = device.getAddress().toString().c_str();
        animal["rssi"] = device.getRSSI();
      }
      
    }
    Serial.println(packageNum);
    Serial.println(totalPackages);
    char output[bufferSize];
    serializeJson(doc, output);
    Serial.println(output);
    pBLEScan->clearResults(); // Clear scan results

  if (client.connected()) {
    client.publish("checkpoint", output);
    Serial.println("Published to MQTT:");
  } else {
    Serial.println("MQTT connection lost. Attempting to reconnect...");
    if (client.connect("ESP32Client")) {
      Serial.println("Reconnected to MQTT");
    }
  }
  }

  
  
  

  // Wait 5 seconds before next scan
  delay(5000);
}
