import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  let key = 'pk_test_cqQWuafc1MYBYk52nubrtWd600SRaZdMZX';
  let priceForStripe = price * 100;

  const onToken = token => {
    console.log(token);
    alert('Payment done');
  }

  return (
    <StripeCheckout 
      label='Pay now'
      name='Crown clothing inc.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay now'
      token={onToken}
      stripeKey={key}
    />
  );
};

export default StripeCheckoutButton;