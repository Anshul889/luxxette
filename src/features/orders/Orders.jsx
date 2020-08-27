import React, { Component } from 'react';
import styles from './Orders.module.css';
import { getOrders, setDelivered, setApproved } from './orderActions.js';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import format from 'date-fns/format';
import { objectToArray } from '../../app/common/util/helpers';

const mapState = state => ({
  orders: state.orders
});

const actions = {
  getOrders,
  setDelivered,
  setApproved
};

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { orders, setDelivered, setApproved } = this.props;
    return (
      <div>
        {orders &&
          orders.map(order => (
            <div className={styles.orderdiv} key={order.id}>
              <div>
                <span>{order.name} </span>
                <span>{order.amount}KSH </span>
                <span>{format(order.date.toDate(), 'do LLL yyyy')}</span>
              </div>
              <div></div>
              <div></div>
              <div>status :{order.status}</div>
              <div></div>
              <div>
                <span>{order.street} </span>
                <span>{order.postcode}</span>
              </div>
              <div>
                {objectToArray(order.products).map(product => (
                  <div>
                    <div>item: {product.title}</div>
                    <div>quantity: {product.quantity}</div>
                    <div>model: {product.model}</div>
                  </div>
                ))}
              </div>
              <Button color={'black'} onClick={() => setDelivered(order)}>
                Delivered
              </Button>
              <Button color={'black'} onClick={() => setApproved(order)}>
                Approved
              </Button>
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapState, actions)(Orders);
