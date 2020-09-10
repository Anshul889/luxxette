import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const CheckoutButton = withRouter(({ history, price, onToken, friendcode}) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_MQZ7qGlUkuJYuYORZLYRduQW008WmFtzTe'

  const onReceiveToken = async (token) => {
    try {
      await onToken(token, price, friendcode);
      history.push('/complete')
    } catch (e) {
      console.log(e)
    }
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
})

export default CheckoutButton
