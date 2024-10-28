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
            fetch('https://script.googleusercontent.com/a/macros/dkpharma.vn/echo?user_content_key=roKe7oNgCXOrqsxMvSTDXbhxzx40CtB-lNp_SDeunDkMYduyiANQBVHZDbhU6UzbRl9w4QHBQCWf0paFoddP00v7omkQVCOpOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKDb6QZ2lUmqFsCZMNkFlWVUh0lmODcuY_0xJh9m3gQ6Cz1wqwbgjB9Pm8QJ8aask_MZfQdot7FAf8heMIPZ_qzzvgUh8KrFHSNPRY-6X6FdCHBzPZ1eJMKWJRG6UADEhjU0EnURFiRDVMGTivs0mtt3iPAz3iOzAmo&lib=MgHDHOou1o4U2zwBlqtMHlQMAFukrRMww')
            .then(response => response.json())
            .then(response => {
                setDatas(response.slice(-20))
            })
            .catch((error) => {
                console.log(error)
            })
        }, 20000)

        return ()=>{
            clearInterval(timeId)
        }

    } , [])

    const rows = []
    datas.map((data) =>{
        rows.push(createData(formatDate(data.time) , data.temp , data.humi))
    })
    



  return (
    <div className="device">
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
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

    <Chart data ={ datas}></Chart>
    <Chart2 data ={ datas}></Chart2>

    </div>
    
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

