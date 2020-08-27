import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_MQZ7qGlUkuJYuYORZLYRduQW008WmFtzTe';

  const onToken = token => {
    console.log('token');
  }

  return (
    <StripeCheckout label='Pay with test card 4242'
    name='Anshul'
    billingAddress
    shippingAddress
    image='https://svgshare.com/i/93J.svg'
    description={`Your total is Rs ${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    currency={'INR'}/>
  )
}

export default CheckoutButton