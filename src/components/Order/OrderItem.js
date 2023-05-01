import React from 'react';

const OrderItem = ({ order, onCancel }) => {
  const { _id, items = [], createdAt, status, name, price } = order;
  console.log(order);

  return (
    <div key={_id}>
      <h3>Order ID: {name}</h3>
      <p>Items: {items.length}</p>
      <p>Price: {price}</p>
      <p>Created At: {createdAt}</p>
      <p>Status: {status}</p>
      {status !== 'cancelled' && <button onClick={() => onCancel(_id)}>Cancel Order</button>}
    </div>
  );
};

export default OrderItem;
