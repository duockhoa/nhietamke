import { useState , useEffect } from "react";
import Chart from './Chart'
import Chart2 from './Chart2.js'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(time, temp, humi) {
  return { time, temp, humi };
}



// var  rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// ];

export default function DenseTable() {
    const [datas , setDatas] = useState([])

    useEffect(()=>{
        let timeId = setInterval(()=> {
            fetch('https://qaduockhoa.click/api/tempandhumi?deviceName=temp1')
            .then(response => response.json())
            .then(response => {
                setDatas(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }, 5000)

        return ()=>{
            clearInterval(timeId)
        }

    } , [])

    const rows = []
    datas.map((data) =>{
        rows.push(createData(formatDateToLocal(data.time) , data.temp , data.humi))
    })
    



  return (
    <div className="device">
       <TableContainer component={Paper} sx={{ minWidth: 300 ,maxWidth: 600  , height: 500 , margin: 5 , border : 'solid 1px'}}>
      <Table sx={{ minWidth: 300 ,maxWidth: 600  }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Thời điểm</TableCell>
            <TableCell align="right">Nhiệt độ</TableCell>
            <TableCell align="right">Độ ẩm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row , index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align="right">{row.humi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
    
  );
}


function formatDateToLocal(date) {
  const d = new Date(date);
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = String(d.getFullYear());
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

