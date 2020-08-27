import {  FETCH_RELATED_ITEMS } from './productConstants';
import firebase from '../../app/config/firebase';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';

export const getRelatedItems = (product) => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let relatedItemsQuery = await firestore
      .collection('products')
      .where('category', '==', product.category)
      .limit(5)
      .get();
    let relatedItems = [];

    for (let i = 0; i < relatedItemsQuery.docs.length; i++){
      let relatedItem = { ...relatedItemsQuery.docs[i].data(), id: relatedItemsQuery.docs[i].id };
      if(relatedItem.title !== product.title){
      relatedItems.push(relatedItem);
      }
    }
    dispatch({type : FETCH_RELATED_ITEMS, payload: {relatedItems}}) ;
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};