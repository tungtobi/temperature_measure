import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import mqtt from 'mqtt';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import './App.css';
import LineChart from './LineChart';
import LineChartRangeTime from './LineChartRangeTime';

const App = () => {
  const [data, setData] = useState([]);
  console.log('Data init: ', data);

  const options = {
    connectTimeout: 4000,

    clientId: 'emqx',

    keepalive: 60,
    clean: true,
    path: '/mqtt',
  };

  // WebSocket connect url
  const WebSocket_URL = 'ws://broker.emqx.io:8083';

  // TCP/TLS connect url
  // const TCP_URL = 'mqtt://broker.emqx.io:1883';
  // const TCP_TLS_URL = 'mqtts://broker.emqx.io:8883';

  const client = mqtt.connect(WebSocket_URL, options);

  // client.on('connect', () => {
  //   console.log('Connect success');
  // });
  client.subscribe('haupc/123', { qos: 1 }, (error) => {
    if (!error) {
      console.log('Subscribe Success');
    }
  });

  client.on('error', (error) => {
    console.log('Connect Error:', error);
  });

  client.on('message', (topic, message) => {
    const rawData = message.toString();
    const jsonData = JSON.parse(rawData);

    setData([...data, jsonData]);

    // disconnect
    // client.end();
  });

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Real time</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Range time</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <LineChart webSocketData={data} />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <LineChartRangeTime />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default App;
