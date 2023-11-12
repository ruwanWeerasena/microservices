import React, { useContext, useState } from 'react'
import './catalog.css'
import CatalogTable from '../../components/catalog/CatalogTable'
import CatalogForm from '../../components/catalog/CatalogForm'
import { ProductsContext } from '../../App'
import { getproductscategorized } from '../overview/Overview'
import ProductPopupImage from '../../components/catalog/ProductPopupImage'

const Catalog = () => {
  const {products,setProducts} = useContext(ProductsContext);
  const[selectedProduct,setSelectedProduct]=useState({type:"add",data:{
    name: '',
    category:'',
    summery:'',
    description:'',
    imageFile:'',
    price:'',
  }});
  return (
    <div className='catalog'>
      <h2>eShop On Container Inventory Management</h2>
     
      <div className='catalogform'><CatalogForm setProducts={setProducts} setSelectedProduct={setSelectedProduct} catData={getproductscategorized(products)} selectedProduct={selectedProduct}/></div>
      <div className='catalogtable'><CatalogTable setProducts={setProducts} setSelectedProduct={setSelectedProduct} products={products}/></div>
    </div>
  )
}

export default Catalog