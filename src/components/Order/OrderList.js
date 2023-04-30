import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders, onCancel }) => {
  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} onCancel={onCancel} />
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
