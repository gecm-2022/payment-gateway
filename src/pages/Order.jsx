import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders/USER_ID');
      setOrders(response.data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order total: {order.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
