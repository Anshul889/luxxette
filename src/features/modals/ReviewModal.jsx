import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../modals/modalActions';
import { Link } from "react-router-dom";
import { objectToArray } from "../../app/common/util/helpers";
import ProductReviewForm from '../product/ProductDetailedPage/ProductReviewForm';
import { addReview } from '../user/userActions';

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
})

const actions = { 
  closeModal,
  addReview
 };

class ReviewModal extends Component {
  render() {
    const {profile, auth, addReview} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Modal size='mini' open={true} onClose={this.props.closeModal}>
        <Modal.Header style={{textAlign: 'center'}}>User Review</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>{objectToArray(profile.previousOrder).map(product => (
              <div key={product.id} style={{marginBottom: '10px'}}>
               <Link to={`product/product.id`}>{product.title}</Link>
               <ProductReviewForm addReview={addReview} product={product} authenticated={authenticated}/>
              </div>
            ))}</div>
            <Button color={'black'} content='Done' onClick={this.props.closeModal}/>
            <Button negative content='Cancel'  onClick={this.props.closeModal}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  mapState,
  actions
)(ReviewModal);