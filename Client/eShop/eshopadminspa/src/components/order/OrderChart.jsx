import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts';

export default function BasicLineChart({data}) {
   
    const xLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <LineChart
      xAxis={[{ data: xLabels, label:"Months",scaleType:'point' }]}
      series={[
        {data: data, label: 'current'},
      ]}
      width={500}
      height={300}
      yAxis={[{label:"No. of Orders",scaleType:"linear",tickMinStep:1}]}
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-30px, 0)',
        },
      }}
    />
  );
}