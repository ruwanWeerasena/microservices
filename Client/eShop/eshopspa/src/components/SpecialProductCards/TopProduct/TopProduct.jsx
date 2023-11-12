import React from 'react'
import './topProduct.css'
import { Favorite } from '@mui/icons-material'
import { Button } from '@mui/material'

const TopProduct = ({product}) => {
  return (
    <div className='topproduct'>
        <div className='topproductcontainer'>
          <div className='topproductcontainerheader'>
              <Favorite style={{color:'white'}}/>
              <span style={{fontWeight:'bolder',color:'white', fontFamily:'sans-serif'}}>TOP PRODUCTS</span>
          </div>
          <div className='topproductcontainerbody'>
              <img  width={200} height={150}style={{maxWidth:'80%'}} src={product.imageFile} alt='topphone'/>
              <div style={{fontFamily:'sans-serif', fontSize:"x-large",fontWeight:"bolder", color:'rgb(0, 76, 239)'}}>{product.name}</div>
          </div>
          <div className='topproductcontainerbuttons'>
                <Button color="error" variant='contained'>{product.price}$</Button>
                <Button color='success' variant='contained'>View</Button>
          </div>
        </div>
    </div>
  )
}

export default TopProduct