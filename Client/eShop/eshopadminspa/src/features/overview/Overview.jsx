import React, { useContext } from 'react'
import './overview.css'
import BasicLineChart from '../../components/order/OrderChart'
import { ProductsContext } from '../../App'
import OrderCount from '../../components/order/OrderCount'
import CatalogOverview from '../../components/catalog/CatalogOverview'
import DiscountsOverview from '../../components/discount/DiscountsOverview'

const Overview = () => {
  const {orders,products,discounts} = useContext(ProductsContext)
  
  
  
  return (
    <div className='overview'>
      <div className='overviewtop'>
       {orders.length && <BasicLineChart data={getOrdersCountPerMonth(orders)}/>}
      </div>
      <div className='overviewtop'>
        <CatalogOverview total={products.length} data={getproductscategorized(products)} />
        <DiscountsOverview total={discounts.length} data={getDiscountscategorizedByProduct(discounts)}/>
        <OrderCount totalcount={orders.length} data={getOrdersCountPerMonth(orders)}/>
      </div>
        
        



    </div>
  )
}

export default Overview

const getOrdersCountPerMonth = (orders)=>{
  const data =orders.map(o=>{
    const month = new Date(o.createdDate).getMonth()+1
    return month
  })
  const groupedobj = Object.groupBy(data,(x)=>x);
  var line1 = new Array(12)
  for (let index = 1; index <= 12; index++) {
    if(groupedobj[index]){
      line1[index-1]=groupedobj[index].length
    }else{
      line1[index-1]=0
    }
   
  };
  return line1
}

export const getproductscategorized = (products)=>{
  const data = Object.groupBy(products,(p)=>p.category);
  return data
}
const getDiscountscategorizedByProduct = (discounts)=>{
  const data = Object.groupBy(discounts,(p)=>p.productName);
  return data
}