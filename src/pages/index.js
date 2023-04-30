import React, { useState } from 'react';
import MenuPage from '../components/Menu/MenuPage';
import PaymentForm from '../components/Payment/PaymentForm';

const IndexPage = () => {
  const [menuItems, setMenuItems] = useState([
    // 메뉴 아이템 데이터를 가져올 수 있는 API 호출 로직 추가
    // 예시:
    // {
    //   _id: '1',
    //   name: 'Pizza',
    //   price: 10,
    //   imageUrl: 'https://example.com/pizza.jpg',
    // },
    // {
    //   _id: '2',
    //   name: 'Burger',
    //   price: 5,
    //   imageUrl: 'https://example.com/burger.jpg',
    // },
  ]);

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
      <MenuPage menuItems={menuItems} />
      <PaymentForm
        total="50"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
};

export default IndexPage;
