import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';

import Wrapper from './LineChart.style';

const ChartLine = (props) => {
  const [fromDate, setFromDate] = useState(new Date().setHours(1));
  const [toDate, setToDate] = useState(new Date().setHours(23));

  const [dataAmbient, setDataAmbient] = useState([]);
  const [dataObject, setDataObject] = useState([]);

  const options = {
    chart: {
      id: 'basic-bar',
    },
    background: '#f2f2f2',
    colors: ['#008ffb', '#8c8c8c'],
    xaxis: {
      title: {
        text: 'Measurement times',
        style: {
          color: '#000',
        },
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FF1654',
        },
        labels: {
          style: {
            colors: '#FF1654',
          },
        },
        title: {
          text: 'Temperature',
          style: {
            color: '#FF1654',
          },
        },
      },
    ],
    noData: {
      text: 'No result',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined,
      },
    },
    legend: {
      horizontalAlign: 'right',
      offsetX: 40,
    },
  };

  const series = [
    {
      name: 'Object',
      data: dataObject,
    },
    {
      name: 'Ambient',
      data: dataAmbient,
    },
  ];

  const handleTimeRange = () => {
    const from = Math.round(new Date(fromDate).getTime() / 1000);
    const to = Math.round(new Date(toDate).getTime() / 1000);

    axios
      .get(`https://btl-backend.herokuapp.com/BTL`, {
        params: {
          startTime: from,
          endTime: to,
        },
      })
      .then(function (response) {
        const { data } = response;
        const dataEnv = _.map(data, (e) => e.env);
        const dataObj = _.map(data, (e) => e.obj);

        setDataAmbient(dataEnv);
        setDataObject(dataObj);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <div className="group-date-range">
        <div className="item-date">
          <label>From:</label>
          <div>
            <i class="far fa-calendar-alt"></i>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              showTimeSelect
              dateFormat="dd-MM-yyyy kk:mm:ss"
            />
          </div>
        </div>
        <div className="item-date">
          <label>To:</label>
          <div>
            <i class="far fa-calendar-alt"></i>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              showTimeSelect
              dateFormat="dd-MM-yyyy kk:mm:ss"
            />
          </div>
        </div>
        <button className="btn btn-success btn-sm" onClick={handleTimeRange}>
          <i class="fas fa-check" style={{ marginRight: '5px' }}></i>
          Apply
        </button>
      </div>
      <div className="line-chart">
        <Chart options={options} series={series} type="line" width="800px" />
      </div>
    </Wrapper>
  );
};

export default ChartLine;
