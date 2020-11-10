import React, { useMemo } from 'react';
import _ from 'lodash';
import Chart from 'react-apexcharts';
import moment from 'moment';

const LineChartRangeTime = ({ data }) => {
  const dataAmbient = useMemo(() => _.map(data, (e) => e.env), [data]);
  const dataObject = useMemo(() => _.map(data, (e) => e.obj), [data]);

  const options = useMemo(
    () => ({
      chart: {
        id: 'basic-bar',
      },
      background: '#f2f2f2',
      colors: ['#008ffb', '#8c8c8c'],
      xaxis: {
        type: 'category',
        categories: _.map(data, (e) => {
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
    [data]
  );

  const series = useMemo(
    () => [
      {
        name: 'Object',
        data: dataObject,
      },
      {
        name: 'Ambient',
        data: dataAmbient,
      },
    ],
    [dataObject, dataAmbient]
  );

  return <Chart options={options} series={series} type="line" width="800px" />;
};

export default LineChartRangeTime;
