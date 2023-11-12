import React, { useContext } from 'react'
import DiscountForm from '../../components/discount/DiscountForm'
import { ProductsContext } from '../../App';
import DiscountTable from '../../components/discount/DiscountTable';

const Discount = () => {
    const {products,discounts, setDiscounts} = useContext(ProductsContext);
  return (
    <div className='discount'>
       <h2>eShop On Container Discounts Management</h2>
        <div className='discountform'>
            <DiscountForm setDiscounts={setDiscounts} products={products}/>
        </div>
        <div className='discounttable'>
            <DiscountTable setDiscounts={setDiscounts} discounts={discounts}/>
        </div>
    </div>
  )
}

export default Discount