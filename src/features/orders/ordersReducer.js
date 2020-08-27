import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_ORDERS, SET_DELIVERED, SET_APPROVED } from './orderConstants';

const initialState = [];

const fetchOrders = (state, payload) => {
  return payload.orders;
};

const setDelivered =(state, payload) => {
  return [
    ...state.filter(order => order.id !== payload.id),
    Object.assign({}, payload)
  ];
}

const setApproved =(state, payload) => {
  return [
    ...state.filter(order => order.id !== payload.id),
    Object.assign({}, payload)
  ];
}

export default createReducer(initialState, {
  [FETCH_ORDERS]: fetchOrders,
  [SET_DELIVERED]: setDelivered,
  [SET_APPROVED]: setApproved
});