import React from 'react'
import './lastProduct.css'
import { Button } from '@mui/material'

export const LastProduct = ({product}) => {
  return (
    <div className='lastproduct'>
        <div className='lastproductcontainer'>
          <div className='lastproductcontainerheader'>
              <span style={{fontWeight:'bolder',color:'white', fontFamily:'sans-serif'}}>LAST PRODUCT</span>
          </div>

          <div className='lastproductcontainerbody'>
              <img width={200}  style={{maxWidth:'60%'}} src={product.imageFile}alt='lastphone'/>
              <div style={{fontFamily:'sans-serif', fontSize:"x-large",fontWeight:"bolder", color:'rgb(0, 76, 239)'}}>{product.name}</div>
              <div style={{fontFamily:'sans-serif', fontSize:"small",fontWeight:"bold" }}>{product.description}</div>
          </div>
          
          <div className='lastproductcontainerfooter'>
               <div>{product.price}$</div>
          </div>
        </div>
    </div>
  )
}
