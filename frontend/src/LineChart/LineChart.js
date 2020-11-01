import React, { useMemo } from 'react';
import _ from 'lodash';
import Chart from 'react-apexcharts';
import moment from 'moment';
import Wrapper from './LineChart.style';

const ChartLine = ({ webSocketData }) => {
  const wsDataEnv = useMemo(() => _.map(webSocketData, (e) => e.env), [
    webSocketData,
  ]);
  const wsDataObj = useMemo(() => _.map(webSocketData, (e) => e.obj), [
    webSocketData,
  ]);

  const options = useMemo(
    () => ({
      chart: {
        id: 'basic-bar',
      },
      background: '#f2f2f2',
      colors: ['#008ffb', '#8c8c8c'],
      xaxis: {
        type: 'category',
        categories: _.map(webSocketData, (e) => {
          const tmp_date = new Date(e.CreatedAt * 1000);
          return moment(tmp_date).format('HH:mm:ss');
        }),
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
    }),
    [webSocketData]
  );

  const series = useMemo(
    () => [
      {
        name: 'Object',
        data: wsDataObj,
      },
      {
        name: 'Ambient',
        data: wsDataEnv,
      },
    ],
    [wsDataEnv, wsDataObj]
  );

  return (
    <Wrapper>
      <div className="line-chart">
        <Chart options={options} series={series} type="line" width="900px" />
      </div>
    </Wrapper>
  );
};

export default ChartLine;
