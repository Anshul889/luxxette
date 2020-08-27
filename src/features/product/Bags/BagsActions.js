import {FETCH_BAGS} from './BagsConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getBags = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let makeUpQuery = await firestore
      .collection('products')
      .where('category', '==', 'tunics')
      .get();
    let bags = [];

    for (let i = 0; i < makeUpQuery.docs.length; i++){
      let bag = { ...makeUpQuery.docs[i].data(), id: makeUpQuery.docs[i].id };
      bags.push(bag);
    }
    dispatch({type : FETCH_BAGS, payload: {bags}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};