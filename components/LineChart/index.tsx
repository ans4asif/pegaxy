import React, { useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import styles from './Chart.module.scss';
import TimeSpan from '../TimeSpan';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import { data } from '../../data';
import { format } from 'date-fns';
type Mydata = {
  xValues: (number | null)[];
  y1Values: number[];
  y2Values: (number | null)[];
  y3Values: (number | null)[];
};
const LineChart = () => {
  const [option, setOption] = useState<Mydata | any>({
    xValues: [],
    y1Values: [],
    y2Values: [],
    y3Values: [],
  });
  const [timeKey, setTimeKey] = useState('24H');
  const [myData, setMyData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const filterData = (key: string) => {
    setLoading(true);
    const res = data?.filter((_) => _.key === key)[0];
    setMyData(res?.data[0]);
    setLoading(false);
  };
  useEffect(() => {
    filterData(timeKey);
    const LineOptions = {
      title: {
        textStyle: {
          richText: {},
        },
      },
      grid: {
        height: '200px',
        right: '2%',
      },
      itemGap: 0,
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#232329',
        borderColor: 'none',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },

      legend: {
        show: false,
      },
      graphic: [
        {
          type: 'image',
          style: {
            image: 'dagenanalytics.png',

            width: 200,
            height: 50,
          },
          right: '0',
          bottom: '35',
        },
      ],

      xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: result,
        data: myData?.xValues,
        margin: '-10',
        axisLine: {
          onZero: false,
          show: false,
          lineStyle: {
            color: ' rgba(255, 255, 255, 0.7)',
            shadowOffsetX: 1,
          },
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        minInterval: 3600 * 1000 * 24 * 2,
        maxInterval: 3600 * 1000 * 24 * 2,
        interval: 3600 * 1000 * 24 * 2,
        axisLabel: {
          formatter: function (value: string) {
            if (timeKey === '7D') {
              return format(Number(value), 'LLL d HH:mm');
            }
            return format(Number(value), 'HH:mm');
          },
        },
      },
      yAxis: {
        // type: 'value',
        show: true,
        name: `No of NFTs`,
        nameLocation: 'middle',
        nameGap: 50,
        axisLabel: {
          formatter: '${value}',
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            width: 0.2,
          },
        },
        axisLine: {
          lineStyle: {
            color: ' rgba(255, 255, 255, 0.7)',
          },
        },
        // min: 0,
        // max: 250,
        axisTick: {
          lineStyle: {
            width: 3,
            shadowOffsetY: 2,
          },
        },
        axisPointer: {
          show: false,
        },
        nameTextStyle: {
          fontSize: 14,
          fontFamily: 'Switzer',
          fontWeight: 'normal',
        },
      },
      series: [
        {
          name: 'Sales Volume',
          type: 'line',
          stack: 'Total',
          // data: [150, 110, 175, 102, 145, 180, 197],
          data: myData.y1Values,
          connectNulls: true,
          color: '#FC69FB',
          showSymbol: false,
          lineStyle: {
            width: 3,
            color: '#FC69FB',
            backgroundColor: '#FC69FB',
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FC69FB',
            color: '#FC69FB',
          },
        },
        {
          name: 'Mint',
          type: 'line',
          // stack: 'value',
          // data: [180, 220, 160, 140, 195, 100, 90],
          data: myData?.y2Values,
          connectNulls: true,
          symbol: 'none',
          color: '#3617E2',
          showSymbol: false,

          lineStyle: {
            width: 3,
            color: '#3617E2',
            backgroundColor: '#3617E2',
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#3617E2',
            color: '#3617E2',
          },
        },
        {
          name: 'Rent',
          type: 'line',
          // stack: 'Total',
          // data: [50, 90, 30, 80, 60, 190, 230],
          data: myData?.y3Values,
          connectNulls: true,
          symbol: 'none',
          showSymbol: false,
          color: '#FAEE6B',

          lineStyle: {
            width: 3,
            color: '#FAEE6B',
            backgroundColor: '#FAEE6B',
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FAEE6B',
            color: '#FAEE6B',
          },
        },
      ],
    };
    setOption(LineOptions);
  }, [timeKey, myData]);
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.chartBox}>
      <div className={styles.chart__content}>
        <div className={styles.chart__header}>
          <div className={styles.text__holder}>
            <h2>Sales Volume</h2>
            <Tooltip title="Lorem ipsumm Lorem ipsumm Lorem ipsumm" />
          </div>
          <TimeSpan setTimeKey={setTimeKey} />
        </div>
        <div className={styles.legends}>
          <Legend
            type="primary"
            heading="Sales Volume"
            title="lorem ipsum"
            percentage={6.49}
          />
          <Legend
            type="secondary"
            heading="Mint"
            title="lorem ipsum"
            percentage={6.49}
          />
          <Legend heading="Rent" title="lorem ipsum" percentage={4.4} success />
        </div>
        <EChartsReact option={option} />
      </div>
    </div>
  );
};

export default LineChart;
