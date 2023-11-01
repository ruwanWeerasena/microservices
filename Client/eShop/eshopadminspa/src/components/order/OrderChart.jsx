import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts';

export default function BasicLineChart() {
    const line1 = [4000, 3000];
    const line2 = [2400, 1398];
    const xLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <LineChart
      xAxis={[{ data: xLabels, label:"Months",scaleType:'point' }]}
      series={[
        {data: line1, label: 'line1'},
        { data: line2, label: 'line2' },
      ]}
      width={500}
      height={300}
      yAxis={[{label:"No. of Orders"}]}
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-30px, 0)',
        },
      }}
    />
  );
}