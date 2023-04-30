import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/cancel`);
      // 주문 상태를 취소로 업데이트
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'cancelled' } : order)));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} onCancel={handleCancelOrder} />
      ))}
    </div>
  );
};

export default Order;
