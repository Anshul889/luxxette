import { createReducer } from '../../../app/common/util/reducerUtils';
import { FETCH_BESTOFFER } from './BestOfferConstants';

const initialState = [];

const fetchbestOffer = (state, payload) => {
  return payload.bestOffer;
};

export default createReducer(initialState, {
  [FETCH_BESTOFFER]: fetchbestOffer,
});
