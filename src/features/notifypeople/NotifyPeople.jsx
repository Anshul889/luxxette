import React, { Component } from 'react';
import { getNotify, deleteNotify } from './notifypeopleActions.js';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { objectToArray } from "../../app/common/util/helpers";

const mapState = state => ({
  products: state.notify
});

const actions = {
  getNotify,
  deleteNotify
}

 class NotifyPeople extends Component {

  componentDidMount(){
    this.props.getNotify()
  }

  render() {
    const {products, deleteNotify} = this.props;
    return (
      <div style={{marginBottom: '30px', width: '90%', margin: '0 auto'}}>
        {products && products.map(product => (
          <div key={product.id}>
            <div>Model : {product.model}</div>
            <div>{product.notify && objectToArray(product.notify).map(pro => (
              <div key={pro.email}>{pro.email}</div>
            ))}</div>
            <Button onClick={() => deleteNotify(product)} content='Delete'/>
          </div>
        ))}
      </div>
    )
  }
}

export default connect(mapState, actions)(NotifyPeople);
