import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import Chart from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'
import axios from "axios"

function ChartLine(props) {

  const [fromDate, setFromDate] = useState(
    new Date()
  );
  const [toDate, setToDate] = useState(new Date());

  const options = {
    options:{
      chart: {
        id: "basic-bar"
      },
      colors: [ '#bfbfbf', '#9C27B0'],
      background: "#f2f2f2",

      xaxis: {
        categories: [20, 30, 40, 50, 50],
        tickPlacement: 'on',
        title: {
          text: "temperature",
          offsetX: 0,
          offsetY: 0,
          style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
          },
        }
      },
      noData: {
        text:"Loading..."
      }
    }
   
  }

  const series = [
    {
    name: "Ambient",
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    name: "Object",
    data: [23, 15, 35, 5, 40, 60, 80, 100]
  },
  ]
  
  const handleTimeRange = () => {
    const from = Math.round(new Date(fromDate).getTime() / 1000);
    const to = Math.round(new Date(toDate).getTime() / 1000);
    axios.get(`https://btl-backend.herokuapp.com/BTL`, {
      params: {
        startTime: from,
        endTime: to
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  return (
    <div>
      <div className="group-date-range">
        <div className="item-date">
          <label>From:</label>
          <DatePicker
            selected={fromDate}
            onChange={date => setFromDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div className="item-date">
          <label>To:</label>
          <DatePicker
            selected={toDate}
            onChange={date => setToDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <button onClick={handleTimeRange}>OK</button>
      </div>
      <div className="chart-line">
      <Chart options={options}
            series={series}
            type="line"
            width="800px"
          />
      </div>
      
    </div>
        );
}

export default ChartLine;