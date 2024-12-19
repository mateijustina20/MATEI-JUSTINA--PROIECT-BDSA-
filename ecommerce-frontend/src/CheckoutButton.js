import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckoutButton = ({ amount }) => {
  const handleToken = async (token) => {
    const response = await axios.post('http://localhost:5000/api/checkout', {
      token,
      amount,
    });

    if (response.data.success) {
      alert('Payment Successful!');
    } else {
      alert('Payment Failed!');
    }
  };

  return (
    <StripeCheckout
      stripeKey="your-stripe-public-key"
      token={handleToken}
      amount={amount}
      name="E-commerce Shop"
      billingAddress
      shippingAddress
    />
  );
};

export default CheckoutButton;



