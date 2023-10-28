import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Nav/Navbar';
import Home from './features/home/Home';
import Products from './features/products/Products';
import Cart from './features/cart/Cart';
import CheckOut from './features/checkout/Checkout';
import { createContext, useEffect, useState } from 'react';
import Order from './features/order/Order';
import axios from 'axios';

const ProductsContext = createContext();

function App() {
  axios.defaults.baseURL = 'http://localhost:8010/';
  const [eShopProducts,seteShopProducts]= useState([])
  const [eShopCart,seteShopCart]= useState({
    userName:"",
    items:[],
    totalPrice:0,
    count:0
  });
  const [eShopOrders,seteShopOrders]=useState([]);

  const calculateCount = (itemList)=>{
    return itemList.reduce((count,item)=>count+item.quantity,0)
  }
  const fetchProducts = async()=>{
    await axios.get(`/catalog`).then(res=>{seteShopProducts(res.data)})
  }
  const fetchCartandorders = async()=>{
    await axios.get(`http://localhost:8005/api/v1/Shopping/ruwan`).then(res=>{seteShopCart({...res.data.basketWithProducts,count:calculateCount(res.data.basketWithProducts.items)});seteShopOrders(res.data.orders)})
  }

 

  useEffect(()=>{

   
    fetchProducts();
    fetchCartandorders();

  },[calculateCount(eShopCart.items)])
  return (
    <ProductsContext.Provider value={{eShopProducts,seteShopProducts,eShopCart,seteShopCart,eShopOrders,seteShopOrders}}>
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className='container'>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/order" element={<Order />}/>
                <Route path="/checkout" element={<CheckOut />}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </ProductsContext.Provider>
  );
}

export default App;
export { ProductsContext };