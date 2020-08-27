import { FETCH_BESTOFFER } from './BestOfferConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getbestOfferForHomepage = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let bestOfferQuery = await firestore
      .collection('products')
      .where('discount', '>=', 10)
      .orderBy('discount', 'desc')
      .limit(4)
      .get();
    let bestOffer = [];

    for (let i = 0; i < bestOfferQuery.docs.length; i++){
      let bestOff = { ...bestOfferQuery.docs[i].data(), id: bestOfferQuery.docs[i].id };
      bestOffer.push(bestOff);
    }
    dispatch({type : FETCH_BESTOFFER, payload: {bestOffer}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
