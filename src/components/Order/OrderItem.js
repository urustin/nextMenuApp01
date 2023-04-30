import React from 'react';

const OrderItem = ({ order, onCancel }) => {
  const { id, items = [], total, createdAt, status } = order;

  return (
    <div>
      <h3>Order ID: {id}</h3>
      <p>Items: {items.length}</p>
      <p>Total: {total}</p>
      <p>Created At: {createdAt}</p>
      <p>Status: {status}</p>
      {status !== 'cancelled' && <button onClick={() => onCancel(id)}>Cancel Order</button>}
    </div>
  );
};

export default OrderItem;
