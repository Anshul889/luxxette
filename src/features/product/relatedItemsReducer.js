import { createReducer } from '../../app/common/util/reducerUtils';
import { FETCH_RELATED_ITEMS } from './productConstants';

const initialState = [];

const fetchRelatedItems = (state, payload) => {
  return payload.relatedItems;
};

export default createReducer(initialState, {
  [FETCH_RELATED_ITEMS]: fetchRelatedItems,
});
