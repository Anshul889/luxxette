import { FETCH_ORDERS,SET_DELIVERED, SET_APPROVED } from "./orderConstants";
import firebase from "../../app/config/firebase";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";

export const getOrders = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    let ordersQuery = await firestore.collection("orders").where("status", "==", 'approved').get();
    let orders = [];

    for (let i = 0; i < ordersQuery.docs.length; i++) {
      let order = { ...ordersQuery.docs[i].data(), id: ordersQuery.docs[i].id };
      orders.push(order);
    }
    dispatch({ type: FETCH_ORDERS, payload: { orders } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const setDelivered = order => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const neworder = {
    ...order,
    status: 'delivered'
  }
  try {
    dispatch(asyncActionStart());
    await firestore.update(`orders/${order.id}`, {
      [`status`]: "delivered"
    });
    await firestore.update(`users/${order.userid}`, {
      [`previousOrderStatus`]: "delivered"
    });
    dispatch({ type: SET_DELIVERED, payload: neworder });
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const setApproved = order => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const neworder = {
    ...order,
    status: 'approved'
  }
  try {
    dispatch(asyncActionStart());
    await firestore.update(`orders/${order.id}`, {
      [`status`]: "approved"
    });
    dispatch({ type: SET_APPROVED, payload: neworder });
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
