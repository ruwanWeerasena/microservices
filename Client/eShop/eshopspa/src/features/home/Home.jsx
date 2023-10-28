import React, { useContext } from 'react'
import './home.css'
import ImageCarousal from '../../components/ImageCarousel/ImageCarousal'
import ProductSet from '../../components/ProductSet/ProductSet'
import TopProduct from '../../components/SpecialProductCards/TopProduct/TopProduct'
import { ProductsContext } from '../../App'

const Home = () => {
  const {eShopProducts} = useContext(ProductsContext);

  const topProduct = eShopProducts.reduce((lowest,item)=>{if(lowest.price>item.price){return item}return lowest},eShopProducts[0])
  const last4Products = eShopProducts.slice((eShopProducts.length-4)-eShopProducts.length).reverse()
  const first4Products = eShopProducts.slice(0-4)
  
  return (
    <div id='homecontainer'>
        <div className='homeupper'>
            <ImageCarousal/>
            {topProduct && <TopProduct product={topProduct}/>}
        </div>
        <div className='homemiddle'>
            {last4Products&&<ProductSet products={last4Products} type={"LAST PRODUCTS"}/>}
        </div>
        <div>
            {first4Products&&<ProductSet products={first4Products} type={"BEST PRODUCTS"}/>}
        </div>
    </div>
  )
}

export default Home