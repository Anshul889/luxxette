import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux';
import { login, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';
import {closeModal} from '../../modals/modalActions'

const actions = {
  login,
  socialLogin,
  closeModal
};

const LoginForm = ({ login, handleSubmit, error, socialLogin, closeModal }) => {
  return (
    <Form size='large' onSubmit={handleSubmit(login)} autoComplete='on'>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        {error && <Label basic color='red' style={{marginBottom : '10px'}}>{error}</Label>}
        <Button style={{marginBottom: '10px', borderRadius: '2px'}} fluid size='large' color='teal'>
          Login
        </Button>
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin socialLogin={socialLogin} closeModal={closeModal}/>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginform' })(LoginForm));
