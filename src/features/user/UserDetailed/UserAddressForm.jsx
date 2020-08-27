import React, { Component } from "react";
import TextInput from "../../../app/common/form/TextArea";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import { addAddress } from "../userActions";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthBetween,
  createValidator,
  isNumeric,
  hasLengthGreaterThan
} from 'revalidate';

const actions = {
  addAddress
};

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

const validate = combineValidators({
  Name: composeValidators(
    isRequired({message: 'Please enter your name'}),
    hasLengthGreaterThan(3)({message: "Please enter a valid name"})
  )(),
  postcode: composeValidators(
    isRequired({ message: 'Please enter a postcode' }),
    hasLengthBetween(6, 6)({
      message: 'Postcode needs to be 6 characters'
    }),
    isNumeric({message: 'Please enter a valid postcode'})
  )(),
  City: isRequired({ message: 'Please enter a city'}),
  Address: isRequired('address'),
  email: composeValidators(
    isRequired({message: 'Please enter your email address'}),
    isValidEmail({message: 'Please enter a valid email'}),
    hasLengthGreaterThan(8)({message: 'enter valid email'})
    )(),
  phone: composeValidators(
    isRequired({message: 'Please enter your phone number'}),
    isNumeric({message: 'enter a valid phone'}),
    hasLengthGreaterThan(7)({message: 'enter a valid phone number'})
    )(),
});

class UserAddressForm extends Component {
  handleAddressSubmit = async values => {
    this.props.addAddress(values);
    this.props.reset();
    this.props.closeForm();
  }

  render() {
    const { invalid, submitting, pristine} = this.props;
    return (
      <div style={{width: '90%', margin: '50px auto', marginTop: '10px'}}>
        <h2>Delivery Address 1</h2>
        <Form onSubmit={this.props.handleSubmit(this.handleAddressSubmit)} >
          <Field placeholder={'Name'} name="Name" type="text" component={TextInput} rows={1} />
          <Field placeholder={'Address'} name="Address" type="text" component={TextInput} rows={2} />
          <Field placeholder={'City'} name="City" type="text" component={TextInput} rows={1} />
          <Field placeholder={'postcode'}name="postcode" type="text" component={TextInput} rows={1} />
          <Field placeholder={'email'} name='email' type='text' component={TextInput} rows={1} />
          <Field placeholder={'phone number'} name='phone' type='text' component={TextInput} rows={1} />
          <Button color={'black'} disabled={invalid || submitting || pristine} content="Submit"/>
          <Button color='red' onClick={() => this.props.closeForm()} content="Cancel"/>
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
    reduxForm({ form: 'addAddress', destroyOnUnmount:false, validate })(
      UserAddressForm
    )
  )
);
