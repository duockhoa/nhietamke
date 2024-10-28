import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart({data}) {
    console.log(data)
    let times = data.map(item => formatDate(item.time));
    let values = data.map(item => item.temp);
    return (
        <LineChart
          width={1900}
          height={900}
          series={[
            { data: values, label: 'Nhiệt độ' },
          ]}
          xAxis={[{ scaleType: 'point', data: times }]}
        />
      );
}



function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Tháng 0-11, nên cộng 1
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getSeconds()

    // Định dạng lại thành chuỗi
    return `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds}`;
}

