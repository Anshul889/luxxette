import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_WISHLIST, DELETE_TO_WISHLIST, ADD_TO_WISHLIST } from './wishlistConstants';

const inititalState = [];

const fetchWishlist = (state, payload) => {
  return payload.products;
}

const addToWishlist = (state, payload) => {
  return [...state, Object.assign({}, payload)];
}

const deleteToWishList = (state, payload) => {
  return [...state.filter(product => product.id !== payload.id)];
};

export default createReducer(inititalState, {
  [FETCH_WISHLIST]: fetchWishlist,
  [DELETE_TO_WISHLIST]: deleteToWishList,
  [ADD_TO_WISHLIST]: addToWishlist
})
