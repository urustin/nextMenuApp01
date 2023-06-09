import React from 'react';
import axios from 'axios';

const MenuItem = ({ menu }) => {
  if (!menu) {
    return null;
  }

  const { id, name, price, image } = menu;

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post('/api/orders', { id , name, price });
      const orderNumber = response.data.orderNumber;
      alert(`주문이 완료되었습니다. 주문 번호: ${orderNumber}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('주문 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleOrderClick = (id, name, price) => {
    handleCreateOrder(id, name, price);
  };
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} width="200" />
      <p>Price: {price}</p>
      <button onClick={()=>handleOrderClick(menu._id, menu.name, menu.price)}>주문하기</button>
    </div>
  );
};

export default MenuItem;
