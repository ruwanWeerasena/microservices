import React from 'react'
import './productSet.css'
import { Favorite } from '@mui/icons-material'
import ProductCard from '../ProductCard/ProductCard'

const ProductSet = ({products,type}) => {
  return (
    <div className='lastproducts'>
        <div className='lastproductscontainer'>
            <div className='lastproductssheader'>
                <Favorite style={{color:'white'}}/>
                <span style={{fontWeight:'bolder',color:'white', fontFamily:'sans-serif'}}>{type}</span>
            </div>
            <div className='lastproductssbody'>
             {
              products.map((item)=><ProductCard key={item.id} product={item}/>)
             }
                
                
            </div>
            <div className='lastproductssfooter'></div>
        </div>
    </div>
  )
}

export default ProductSet