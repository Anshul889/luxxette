import React, { Component } from 'react';
import TextInput from '../../app/common/form/TextArea';
import { Field, reduxForm } from 'redux-form';
import { Form, Button,} from 'semantic-ui-react';
import { addFriendCode } from '../user/userActions';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import {
  composeValidators,
  combineValidators,
  hasLengthBetween
} from 'revalidate';
import styles from './FriendCode.module.css'

const actions = {
  addFriendCode
};

const validate = combineValidators({
  FriendCode: composeValidators(
    hasLengthBetween(6, 10)({ message: 'enter a valid referral code' })
  )()
  });

class FriendCodeForm extends Component {
  handleFriendCodeSubmit = async values => {
    this.props.addFriendCode(values);
    this.props.closeFriendCodeForm();
  };

  render() {
    const { invalid, submitting } = this.props;
    return (
      <div style={{width: '90%', margin: '10px auto', maxWidth: '1080px'}}>
      <Form onSubmit={this.props.handleSubmit(this.handleFriendCodeSubmit)} className={styles.form}>
        <Field
          placeholder={'Referral Code (Optional)'}
          name='FriendCode'
          type='text'
          component={TextInput}
          rows={1}
        />
        <Button disabled={invalid || submitting} color='black' content='Submit' style={{height: '40px'}} />
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
      FriendCodeForm
    )
  )
);
