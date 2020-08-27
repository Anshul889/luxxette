import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ProductList from '../ProductList/ProductList';
import { Loader } from 'semantic-ui-react';
import {openModal} from '../../modals/modalActions.js'
import {previousOrderDelete} from '../../user/userActions'

const mapState = state => ({
  products: state.firestore.ordered.products,
  loading: state.async.loading,
  profile: state.firebase.profile
});

const actions = {
  openModal,
  previousOrderDelete,
}

class ProductDashBoard extends Component {

  componentDidMount(){
    if(this.props.profile.previousOrderStatus === 'delivered'){
      this.props.openModal('ReviewModal');
      this.props.previousOrderDelete();
    }
  }

  render() {
    const { products, loading } = this.props;
    return (
      <Fragment>
        <ProductList
          loading={loading}
          products={products}
        />
        <Loader active={loading} style={{paddingBottom : '50px'}}/>
      </Fragment>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'products' }])(ProductDashBoard));
