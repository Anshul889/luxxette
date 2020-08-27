import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_PRODUCTS, DELETE_PRODUCT } from './productConstants';

const initialState = [];

const fetchProducts = (state, payload) => {
  return payload.products;
};

const deleteProduct = (state, payload) => {
  return [...state.filter(product => product.id !== payload.id)];
};

export default createReducer(initialState, {
  [FETCH_PRODUCTS]: fetchProducts,
  [DELETE_PRODUCT]: deleteProduct
});
