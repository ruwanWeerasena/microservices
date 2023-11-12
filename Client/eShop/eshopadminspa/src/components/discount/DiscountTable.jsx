import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { deleteDiscount } from '../../App';

const DiscountTable = ({discounts,setDiscounts}) => {
  const handleDlete = (productName)=>{
    const confirm = window.confirm("Are You Sure to Delete?")
    if(confirm){
       deleteDiscount(productName,setDiscounts)
    }
  }
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="right">Product Name</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {discounts.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="right">{row.productName}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right"><Button onClick={()=>{handleDlete(row.productName)}} color='error' variant='contained'>Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default DiscountTable