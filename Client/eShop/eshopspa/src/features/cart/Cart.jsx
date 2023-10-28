import React, { useContext } from 'react'
import './cart.css'
import { Breadcrumbs, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import { ProductsContext } from '../../App'
import axios from 'axios'

const Cart = () => {
  const {eShopCart,seteShopCart} = useContext(ProductsContext);
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
                to={'/products'}
                >
                Cart
                </Link>
              
            </Breadcrumbs>
        </div>
        <div className='cartpagebody'>
          <div className='cartpagebodytable'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }}  aria-label="spanning table">
                  <TableHead sx={{backgroundColor:"#E5E4E2"}}>
                 
                    <TableRow>
                      <TableCell>Products</TableCell>
                      <TableCell align="right">Available</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Discounted Price</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                   {
                    eShopCart.items?.map((item)=>{
                      return (
                      <TableRow key={item.productId}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell align="right">In Stock</TableCell>
                        <TableCell align="right">
                          <button onClick={()=>{removeItemFromCart(item.productId,eShopCart,seteShopCart)}} style={{padding:"0px 5px 0px 5px"}}>-</button>&nbsp;<span  className='quantitybox'>{item.quantity}</span>&nbsp;<button onClick={()=>{addItemToCart(item,eShopCart,seteShopCart)}} style={{padding:"0px 5px 0px 5px"}}>+</button>
                        </TableCell>
                        <TableCell align="right">{item.price}$</TableCell>
                        <TableCell align="right">{item.discountedPrice}$</TableCell>
                        <TableCell align="right"><Delete color='error'/></TableCell>
                      </TableRow>);
                    })
                   }
                      
                    
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell align="center" colSpan={3}>Total</TableCell>
                      <TableCell align="right">{eShopCart.totalPrice}$</TableCell>
                    </TableRow>
             
                   
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
          <div className='cartpagefooter'>
              <Button onClick={()=>{navigate('/products')}} color='success' fullWidth variant='contained'>Continue Shopping</Button>
              <Button onClick={()=>{navigate('/checkout')}} color='error' fullWidth variant='contained'>Checkout</Button>
          </div>
        </div>

       
    </div>
  )
}

export default Cart

const addToCart = async(newCart,setState)=>{
  await axios.post(`/basket`,newCart).then(res=>setState({...res.data,count:res.data.items.reduce((count,item)=>count+item.quantity,0)}));
}

const addItemToCart = (product,state,setState)=>{
 
  const alreadyAvailableItem = state.items.find((item) => item.productId === product.productId);
  var newCart = {}
  if (alreadyAvailableItem) {
     newCart = {...state,items: state.items.map((item) => {
      if (item.productId === product.productId) {
        return {...product,quantity: item.quantity+1};
      }
      return item;
    }),
  };
  }
  else{
     newCart = {...state,items:[...state.items,product]}
  }
  addToCart(newCart,setState)
  // setState((prevState)=>{
  //   console.log("prev",prevState);
  //   const alreadyAvailableItem = prevState.items.find((item) => item.productId === product.productId);

  //   if (alreadyAvailableItem) {
  //     return {...prevState,items: prevState.items.map((item) => {
  //       if (item.productId === product.productId) {
  //         return {...product,quantity: item.quantity+1};
  //       }
  //       return item;
  //     }),
  //   };
  //   }
  //   else{
  //     return {...prevState,items:[...prevState.items,product]}
  //   }
  // })

}

const removeItemFromCart = (productId,state, setState) => {
  const alreadyAvailableItem = state.items.find((item) => item.productId === productId);
  var newCart = {}
  if (alreadyAvailableItem) {
    if (alreadyAvailableItem.quantity > 1) {
      newCart = {...state,items: state.items.map((item) => {
          if (item.productId === productId) {
            return {...item,quantity: item.quantity-1};
          }
          return item;
        }),
      };
    } else {
      newCart =  {...state,items: state.items.filter((item) => item.productId !== productId)};
    }
    }
    addToCart(newCart,setState)
// setState((prevState) => {
// const alreadyAvailableItem = prevState.items.find((item) => item.productId === productId);

// if (alreadyAvailableItem) {
// if (alreadyAvailableItem.quantity > 1) {
//   return {...prevState,items: prevState.items.map((item) => {
//       if (item.productId === productId) {
//         return {...item,quantity: item.quantity-1};
//       }
//       return item;
//     }),
//   };
// } else {
//   return {...prevState,items: prevState.items.filter((item) => item.productId !== productId)};
// }
// }
// return prevState;
// });
};
export{removeItemFromCart,addItemToCart}