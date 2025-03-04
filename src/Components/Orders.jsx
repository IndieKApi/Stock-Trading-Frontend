import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleOrder from './Orders/SingleOrder';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setIsLoggedIn(!!jwt);

    if (jwt) {
      const fetchOrders = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`http://localhost:5000/order/get/${userId}`, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          });
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, []);

  if (!isLoggedIn) {
    return <div className="text-center mt-5">Please login to get orders</div>;
  }

  if (!orders.length) {
    return <div className="text-center mt-5">No orders found</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Orders</h1>
      {orders.reverse().map((order) => (
        <SingleOrder key={order.orderId} order={order} />
      ))}
      <div style={{height:'70px'}}></div>
    </div>
  );
};

export default Orders;
