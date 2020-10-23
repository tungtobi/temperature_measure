#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_MLX90614.h>

const char* ssid = "abc123"; // Enter your WiFi name
const char* password = "87654321"; // Enter WiFi password
const char* mqttServer = "broker.emqx.io";
const int mqttPort = 1883;

const char* TOPIC = "test/post";

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

WiFiClient espClient;
PubSubClient client(espClient);

void setup()
{
    Serial.begin(9600);

    Serial.print("Connecting to WiFi.. ");
    WiFi.begin(ssid, password);
    
    int i = 0;
    // Wait for the Wi-Fi to connect
    while (WiFi.status() != WL_CONNECTED)
    { 
        delay(1000);
        Serial.print(++i);
        Serial.print(' ');
    }

    Serial.println();
    Serial.println("Connected to the WiFi network");
 
    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);
 
    while (!client.connected()) 
    {
        Serial.println("Connecting to MQTT...");
 
        if (client.connect("ESP8266Client"))
        {
            Serial.println("connected");  
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }
 
    client.publish(TOPIC, "Hello from ESP8266"); //Topic name
    client.subscribe(TOPIC);

    Serial.println("Adafruit MLX90614");  
    mlx.begin();  
}

void callback(char* topic, byte* payload, unsigned int length)
{
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);

    Serial.print("Message:");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }

    Serial.println();
    Serial.println("-----------------------");
}
 
void loop() {
    client.loop();

    Serial.print("Ambient = ");
    Serial.print(mlx.readAmbientTempC());

    Serial.print("*C\tObject = ");
    Serial.print(mlx.readObjectTempC());
    Serial.println("*C");

    Serial.print("Ambient = ");
    Serial.print(mlx.readAmbientTempF());

    Serial.print("*F\tObject = ");
    Serial.print(mlx.readObjectTempF());
    Serial.println("*F");

    Serial.println();

    // convert to json format
    char* jsonData = toJson(mlx.readAmbientTempC(), mlx.readObjectTempC());
    client.publish(TOPIC, jsonData);

    delay(2000);
}

char* toJson(float ambient, float object) {
    char* s = (char*) malloc(27);
    snprintf(s, 27, "{\"env\":%.2f, \"obj\":%.2f}", ambient, object);
    return s;
}
