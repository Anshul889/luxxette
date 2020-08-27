import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import StarRating from '../../../app/common/form/StarRating';
import TextArea from '../../../app/common/form/TextArea';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';

const validate = combineValidators({
  rating: composeValidators(
    isRequired('rating'),
    )(),
  comment: composeValidators(
    isRequired({ message: 'Please enter a review' }),
    hasLengthGreaterThan(4)({
      message: 'The review needs to be at least 4 characters long'
    })
  )(),
});

 class ProductReviewForm extends Component {

  handleReviewSubmit = async values => {
    const {addReview, product, reset} = this.props;
    addReview(product, values);
    reset();
  }
  render() {
    const { invalid, submitting, pristine, isReviewer, authenticated} = this.props;
    return (
     authenticated && <div>{isReviewer ? <h3>Edit your Review</h3> : <h3 style={{textAlign: 'center'}}>Add a review</h3>}
      <Form style={{width: '90%', margin: '0 auto', maxWidth: '1080px'}} onSubmit={this.props.handleSubmit(this.handleReviewSubmit)}>
        <span>Please select a rating</span>
        <Field name='rating' type='text' component={StarRating} />
        <Field placeholder="Review" name='comment' type='text' component={TextArea} rows={2} />
        <Button color={'black'} disabled={invalid || submitting || pristine} content={isReviewer ? 'Edit Review' : 'Add Review'} labelPosition='left' icon='edit' />
      </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'productReview', validate })(ProductReviewForm);