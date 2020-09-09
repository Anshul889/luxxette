import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button } from 'semantic-ui-react'

const CheckoutButton = ({ price, onToken }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_MQZ7qGlUkuJYuYORZLYRduQW008WmFtzTe'

  const onReceiveToken = (token) => {
    onToken(token)
  }

  return (
    <StripeCheckout
      label='Pay with test card 4242'
      name='Anshul'
      billingAddress
      shippingAddress
      image='https://stripe.com/img/documentation/checkout/marketplace.png'
      description={`Your total is $ ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onReceiveToken}
      stripeKey={publishableKey}
      currency={'USD'}
    >
      <Button color='black'>Pay with test card 4242</Button>
    </StripeCheckout>
  )
}

export default CheckoutButton
