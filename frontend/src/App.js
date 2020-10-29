import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import mqtt from 'mqtt'
import _ from 'lodash';

import './App.css';
import LineChart from './LineChart';

const App = () => {
  const [data, setData] = useState([])
  console.log("Data init: ", data);
  // <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
  // const mqtt = require('mqtt')
  // connect options
  const options = {
        connectTimeout: 4000,

        // Authentication
        clientId: 'emqx',
        // username: 'emqx',
        // password: 'emqx',

        keepalive: 60,
        clean: true,
  }

  // WebSocket connect url
  const WebSocket_URL = 'ws://broker.emqx.io:8083/mqtt'

  // TCP/TLS connect url
  const TCP_URL = 'mqtt://broker.emqx.io:1883'
  const TCP_TLS_URL = 'mqtts://broker.emqx.io:8883'

  const client = mqtt.connect(WebSocket_URL, options)

  client.on('connect', () => {
      console.log('Connect success')
      client.subscribe('haupc/123', { qos: 1 }, (error) => {
        if (!error) {
            console.log('Subscribe Success');
        }
    })

  })

  client.on('reconnect', (error) => {
      console.log('reconnecting:', error)
  })

  client.on('error', (error) => {
      console.log('Connect Error:', error)
  })

  client.on('message', (topic, message) => {
    const rawData = message.toString();
    const jsonData = JSON.parse(rawData);
    const tmp = _.get(jsonData, 'jsonData');
    setData({...data, tmp});
    console.log("Data: ", data);
    console.log('Received form', topic, ':', jsonData);
  
    // disconnect
    client.end()
  })

  return <LineChart webSocketData={data}/>;
};

export default App;
