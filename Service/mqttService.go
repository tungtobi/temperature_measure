package Service

import (
	"encoding/json"
	"fmt"
	"log"
	"rest-test/Models"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

func connect(clientID string, uri string) mqtt.Client {
	opts := createClientOptions(clientID, uri)
	client := mqtt.NewClient(opts)
	token := client.Connect()
	for !token.WaitTimeout(3 * time.Second) {
	}
	if err := token.Error(); err != nil {
		log.Fatal(err)
	}
	return client
}

func createClientOptions(clientID string, uri string) *mqtt.ClientOptions {
	opts := mqtt.NewClientOptions()
	opts.AddBroker(fmt.Sprintf("tcp://%s", uri))
	// opts.SetUsername(uri.User.Username())
	// password, _ := uri.User.Password()
	// opts.SetPassword(password)
	opts.SetClientID(clientID)
	return opts
}

func doListenThings(client mqtt.Client, msg mqtt.Message) {
	fmt.Printf("TOPIC: %s\n", msg.Topic())
	fmt.Printf("MSG: %s\n", msg.Payload())

	var temp Models.Temperature
	if err := json.Unmarshal(msg.Payload(), &temp); err != nil {
		log.Println(err)
	}

	if err := Models.CreateTemperature(&temp); err != nil {
		log.Println(err)
	}

}

// Listen mqtt broker
func Listen(uri string, topic string, clientID string) {
	client := connect(clientID, uri)
	client.Subscribe(topic, 0, doListenThings)
}
