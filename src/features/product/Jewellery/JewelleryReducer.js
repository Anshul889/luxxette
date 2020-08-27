import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_JEWELLERY } from './JewelleryConstants';

const initialState = [];

const fetchJewellery = (state, payload) => {
  return payload.jewellery;
};

export default createReducer(initialState, {
  [FETCH_JEWELLERY]: fetchJewellery,
});