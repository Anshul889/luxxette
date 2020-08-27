import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_BAGS } from './BagsConstants';

const initialState = [];

const fetchBags = (state, payload) => {
  return payload.bags;
};

export default createReducer(initialState, {
  [FETCH_BAGS]: fetchBags,
});