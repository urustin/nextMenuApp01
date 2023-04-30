import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentForm = ({ total, onSuccess, onError }) => {
  const clientId = 'YOUR_PAYPAL_CLIENT_ID';

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
            currency_code: 'USD',
          },
        },
      ],
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      onSuccess(details);
    });
  };

  const handleError = (err) => {
    onError(err);
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': clientId }}>
      <PayPalButtons
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={handleError}
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'pill',
          label: 'pay',
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentForm;
