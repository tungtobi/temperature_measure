import React, {useState, useEffect, Component} from 'react';
import DatePicker from "react-datepicker";
import Chart from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import ChartLine from './ChartLine';

class App extends Component {

  // instance of websocket connection as a class property
  ws = new WebSocket('ws://broker.emqx.io:8883/test')

  componentDidMount() {
      this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      }

      this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({dataFromServer: message})
      console.log(message)
      }

      this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

      }

  }

  render(){
      return (<ChartLine websocket={this.ws} />)
  }
}

export default App;
