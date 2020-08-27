import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_TOPSELLERS } from './TopSellersConstants';

const initialState = [];

const fetchTopSellers = (state, payload) => {
  return payload.TopSellers;
};

export default createReducer(initialState, {
  [FETCH_TOPSELLERS]: fetchTopSellers,
});
