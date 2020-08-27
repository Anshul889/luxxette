import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_USER_ORDERS } from './userConstants';

const initialState = [];

const fetchUserOrders = (state, payload) => {
  return payload.orders;
};

export default createReducer(initialState, {
  [FETCH_USER_ORDERS]: fetchUserOrders,
});