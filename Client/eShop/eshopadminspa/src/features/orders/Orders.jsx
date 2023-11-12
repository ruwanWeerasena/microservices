import React, { useContext } from "react";
import OrdersTable from "../../components/order/OrdersTable";
import { ProductsContext } from "../../App";

const Orders = () => {
    const {orders} = useContext(ProductsContext);
  return (
    <div className="orders">
      <h2>eShop On Container Orders Management</h2>
      <div className="orderstable">
        <OrdersTable orders={orders}/>
      </div>
    </div>
  );
};

export default Orders;
