import React, { useContext, useEffect, useState } from 'react'
import './productCard.css'
import { Button } from '@mui/material'
import { Done, ShoppingCart } from '@mui/icons-material'
import axios from 'axios'
import { ProductsContext } from '../../App'
import { addItemToCart } from '../../features/cart/Cart'

const ProductCard = ({product}) => {
    const {eShopCart,seteShopCart} = useContext(ProductsContext);
    const [addingStatus,setAddingStatus] =useState("idle");

    const productNeedToBeAdded={
        color:"default",
        quantity:1,
        price:product.price,
        productId:product.id,
        productName:product.name
        
    }
    useEffect(()=>{
        addingStatus!=="idle"&&setTimeout(()=>{setAddingStatus("idle")},500)
    },[addingStatus])
  return (
    <div className='productcard'>
       
        <div className='productcardimg'>
            <img style={{maxWidth:'60%'}} src={`/images/phones/${product.imageFile}`} alt='topphone'/>
        </div>
        <div className='productcardtitle'>
            {product.name}
        </div>
        <div className='productcarddescription'>
            {product.description}
        </div>
        <div className='productcardbuttons'>
            <Button sx={{width:'100%'}} color='error' variant='contained'>{product.price}$</Button>
            <Button onClick={()=>{addItemToCart(productNeedToBeAdded,eShopCart,seteShopCart);setAddingStatus("adding")}} sx={{width:'100%'}} endIcon={addingStatus==="idle"?<ShoppingCart/>:""} color='success' variant='contained'>{addingStatus==="idle"?"Add To Cart":<Done/>}</Button>
        </div>
     
    </div>
  )
}

export default ProductCard