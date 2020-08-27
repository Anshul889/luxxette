import {FETCH_BEAUTY} from './BeautyConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getBeauty = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let makeUpQuery = await firestore
      .collection('products')
      .where('category', '==', 'dress')
      .get();
    let beauty = [];

    for (let i = 0; i < makeUpQuery.docs.length; i++){
      let beaut = { ...makeUpQuery.docs[i].data(), id: makeUpQuery.docs[i].id };
      beauty.push(beaut);
    }
    dispatch({type : FETCH_BEAUTY, payload: {beauty}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};