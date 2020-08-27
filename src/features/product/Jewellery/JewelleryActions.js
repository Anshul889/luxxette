import {FETCH_JEWELLERY} from './JewelleryConstants';
import firebase from '../../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../async/asyncActions';

export const getJewellery = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let makeUpQuery = await firestore
      .collection('products')
      .where('category', '==', 'tops')
      .get();
    let jewellery = [];
    for (let i = 0; i < makeUpQuery.docs.length; i++){
      let jewel = { ...makeUpQuery.docs[i].data(), id: makeUpQuery.docs[i].id };
      jewellery.push(jewel);
    }
    dispatch({type : FETCH_JEWELLERY, payload: {jewellery}});
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};