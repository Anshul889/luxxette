import React from 'react';
import styles from './Register.module.css';
import {combineValidators, isRequired} from 'revalidate'
import { registerUser } from '../authActions';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => ({
  auth : state.firebase.auth
})

const actions ={
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

const Register =({handleSubmit, registerUser, error, invalid, submitting, auth}) => {
  const authenticated = auth.isLoaded && !auth.isEmpty;
  if (authenticated){
    return <Redirect to="/" />
  }
  return (
    <div className={styles.registerform}>
      <Form size='large' onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field name='displayName' type='text' component={TextInput} placeholder="Username"/>
          <Field name='email' type='text' component={TextInput} placeholder="Email"/>
          <Field name='password' type='password' component={TextInput} placeholder="Password"/>
          {error && <Label basic color='red'>{error}</Label>}
          <Button disabled={invalid || submitting}>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  )
}

export default connect(mapStateToProps, actions)(reduxForm({form:'registerForm', validate})(Register));