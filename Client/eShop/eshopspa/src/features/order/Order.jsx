import React, { useContext } from 'react'
import './order.css'
import { Breadcrumbs, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../App'
//cartpage css  change later

const Order = () => {
  const {eShopOrders} = useContext(ProductsContext);
  const navigate = useNavigate();
  return (
    <div id='cartpage'>
        <div className='cartpageheader'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to={'/'}>
                Home
                </Link>
                <Link
                underline="hover"
                color="inherit"
                to={'/order'}
                >
                Order
                </Link>
              
            </Breadcrumbs>
        </div>
        <div className='cartpagebody'>
          <div className='cartpagebodytable'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }}  aria-label="spanning table">
                  <TableHead sx={{backgroundColor:"#E5E4E2"}}>
                 
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   
                   {eShopOrders?.length==0?
                    <TableRow >
                      <TableCell colSpan={5} align='center'>You don't have previous orders</TableCell>
                    </TableRow>:
                    eShopOrders?.map((order,idx)=>{
                      return(
                        <TableRow key={idx} >
                          <TableCell>{order.firstName}</TableCell>
                          <TableCell align="right">{order.lastName}</TableCell>
                          <TableCell align="center">{order.emailAddress}</TableCell>
                          <TableCell align="right">{order.addressLine}</TableCell>
                          <TableCell align="right">{order.totalPrice}</TableCell>
                        </TableRow>
                      );
                    })
                   }
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
          <div className='cartpagefooter'>
              <Button onClick={()=>{navigate('/products')}} color='success' fullWidth variant='contained'>Continue Shopping</Button>
          </div>
        </div>

       
    </div>
  )
}

export default Order