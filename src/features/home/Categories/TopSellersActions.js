import { FETCH_TOPSELLERS } from './TopSellersConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getTopSellersForHomepage = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let TopSellersQuery = await firestore
      .collection('products')
      .orderBy("sold", "desc")
      .limit(6)
      .get();
    let TopSellers = [];

    for (let i = 0; i < TopSellersQuery.docs.length; i++){
      let topseller = { ...TopSellersQuery.docs[i].data(), id: TopSellersQuery.docs[i].id };
      TopSellers.push(topseller);
    }
    dispatch({type : FETCH_TOPSELLERS, payload: {TopSellers}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
