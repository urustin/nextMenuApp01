import React, { useState } from 'react';
import Menu from '../components/Menu/Menu';

import MenuPage from '../components/Menu/MenuPage';
import PaymentForm from '../components/Payment/PaymentForm';
import Footer2 from '../components/Footer2/Footer2'; // import Footer2

const IndexPage = ({ menus }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // 총 Price 합을 계산하는 함수
  const calculateTotalPrice = () => {
    let total = 0;
    for (const order of orders) {
      const menuItem = menus.find((menu) => menu.id === order.menuId);
      if (menuItem) {
        total += menuItem.price;
      }
    }
    return total;
  };

  const handlePaymentSuccess = (details) => {
    // 결제 성공 시 처리 로직 작성
    // 예: 데이터베이스에 주문 정보 저장 및 사용자에게 알림 전송
    console.log('Payment success:', details);
  };

  const handlePaymentError = (error) => {
    // 결제 에러 시 처리 로직 작성
    // 예: 사용자에게 에러 메시지 표시
    console.error('Payment error:', error);
  };

  return (
    <div>
      <Menu items={menus} orders={orders} setOrders={setOrders} />
      <PaymentForm
        total="50"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      <Footer2 total={calculateTotalPrice()} />
    </div>
  );
};

export default IndexPage;
