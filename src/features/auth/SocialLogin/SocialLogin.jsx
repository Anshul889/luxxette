import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SocialLogin = ({socialLogin, closeModal, registerUser}) => {
  return (
        <div>
          <Link to='/register'><Button onClick={closeModal} color="black" type="button" style={{marginBottom: '10px', borderRadius: '2px'}} fluid>
           Register with Email
          </Button></Link>
          {/* <Button onClick={() => socialLogin('facebook')} type="button" style={{marginBottom: '10px', borderRadius: '2px'}} fluid color="facebook">
            <Icon name="facebook" /> Login with Facebook
          </Button>
     */}
          <Button onClick={() => socialLogin('google')} style={{marginBottom: '10px', borderRadius: '2px'}} type="button" fluid color="google plus">
            <Icon name="google" />
            Login with Google
          </Button>
          <Button style={{marginBottom: '10px', borderRadius: '2px'}} negative fluid content='Cancel'  onClick={closeModal}/>
        </div>
  )
}

export default SocialLogin