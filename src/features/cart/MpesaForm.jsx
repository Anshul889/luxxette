import React, { Component } from 'react';
import TextInput from '../../app/common/form/TextArea';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { addMpesaNumber } from '../user/userActions';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import {
  composeValidators,
  combineValidators,
  isRequired,
  isNumeric,
  hasLengthBetween
} from 'revalidate';

const actions = {
  addMpesaNumber
};

const validate = combineValidators({
  mpesa: composeValidators(
    isRequired({ message: 'Please enter your phone number' }),
    isNumeric({ message: 'enter a valid phone' }),
    hasLengthBetween(10, 10)({ message: 'enter a valid phone number' })
  )(),
  Verificaton: composeValidators(
    isRequired({message: 'Please enter your verification code' }),
    hasLengthBetween(10, 10)({ message: 'enter a valid phone number' })
  )
  });

class MpesaForm extends Component {
  handleMpesaSubmit = async values => {
    this.props.addMpesaNumber(values);
    this.props.closeMpesaForm();
  };

  render() {
    const { invalid, submitting } = this.props;
    return (
      <div style={{width: '90%', margin: '50px auto', marginTop: '10px', maxWidth: '1080px'}}>
      <div style={{marginBottom: '10px'}}>
        <div>1. Go to Safaricom Menu</div>
        <div>2. Select M-PESA</div>
        <div>3. Select Lipa na MPESA</div>
        <div>4. Select Buy Goods and Services</div>
        <div>5. Enter Till number: 697787</div>
        <div>6. Enter Amount</div>
      </div>
      <Form onSubmit={this.props.handleSubmit(this.handleMpesaSubmit)}>
        <Field
          placeholder={'Type Your Mpesa Number'}
          name='mpesa'
          type='text'
          component={TextInput}
          rows={1}
        />
        <Field
          placeholder={'Type the Mpesa Confirmation Code'}
          name='Verification'
          type='text'
          component={TextInput}
          rows={1}
        />
        <Button disabled={invalid || submitting} content='Submit' />
        <Button color='red' onClick={() => this.props.closeMpesaForm()} content="Cancel"/>
      </Form>
      </div>
    );
  }
}

export default withFirestore(
  connect(
    null,
    actions
  )(
    reduxForm({ form: 'addAddress', validate })(
      MpesaForm
    )
  )
);
