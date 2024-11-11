#include <WiFi.h>
#include <PubSubClient.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <ArduinoJson.h>

// Constants
const char* ssid = "NAVE WiFi - 01846";
const char* password = "21904450";
const char* mqtt_server = "192.168.100.190";
const int mqtt_port = 1883;
const size_t bufferSize = 2048;
const int devicesPerPacket = 2;

WiFiClient espClient;
PubSubClient client(espClient);

BLEScan* pBLEScan;
const int scanTime = 10; // In seconds

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(F("Connecting to WiFi..."));
  }
  Serial.println(F("Connected to WiFi"));

  // Connect to MQTT broker
  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected()) {
    Serial.println(F("Connecting to MQTT..."));
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
  int totalPackages = ceil((float) totalDevices / devicesPerPacket);
  int packageNum = 1;
  

  // Recorro los dispositivos
  for (int i = 0; i < totalDevices; i += devicesPerPacket) {
    // Armo cada 
    StaticJsonDocument<bufferSize> doc;
    doc["checkpointID"] = WiFi.macAddress();
    doc["packageNum"] = packageNum;
    doc["totalPackages"] = totalPackages;
    //JsonArray animalsArray = doc.createNestedArray("animals");
    JsonArray animalsArray = doc["animals"].to<JsonArray>();
    for (int j = 0; ((j < devicesPerPacket) && ((i + j) < totalDevices)); j++) {
      BLEAdvertisedDevice device = foundDevices->getDevice(i+j);
      JsonObject animal = animalsArray.createNestedObject();
      String adress = device.getAddress().toString();
      animal["id"] = adress;
      animal["rssi"] = device.getRSSI();
    }
    char output[bufferSize];
    serializeJson(doc, output);
    

    if (client.connected()) {
      client.publish("checkpoint", output);
      Serial.println("Published to MQTT:");
      Serial.println(output);
      packageNum++;
    } else {
      Serial.println("MQTT connection lost. Attempting to reconnect...");
      if (client.connect("ESP32Client")) {
        Serial.println("Reconnected to MQTT");
      }
    }
    
  }
  pBLEScan->clearResults();
  // Wait 5 seconds before next scan
  delay(5000);
}
