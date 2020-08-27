import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_BEAUTY } from './BeautyConstants';

const initialState = [];

const fetchBeauty = (state, payload) => {
  return payload.beauty;
};

export default createReducer(initialState, {
  [FETCH_BEAUTY]: fetchBeauty,
});