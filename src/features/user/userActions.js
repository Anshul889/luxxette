import { toastr } from 'react-redux-toastr'
import firebase from '../../app/config/firebase'
import {
  ADD_TO_WISHLIST,
  FETCH_WISHLIST,
  DELETE_TO_WISHLIST,
} from '../wishlist/wishlistConstants'
import { FETCH_USER_ORDERS } from './userConstants'

export const addToCart = (product, values) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  const newProduct = {
    ...product,
    quantity: values.quantity,
    discountedPrice: product.price - (product.price * product.discount) / 100,
    totalPrice:
      values.quantity *
      (product.price - (product.price * product.discount) / 100),
  }
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}`]: newProduct,
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeFromCart = (product) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}`]: firestore.FieldValue.delete(),
    })
  } catch (error) {
    console.log(error)
    toastr.error('Oops', 'something went wrong')
  }
}

export const addToWishlist = (product) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  const profile = getState().firebase.profile
  const wishlistAdder = {
    isWishList: true,
    photoURL: profile.photoURL || '../../../assets/icons/user-circle.svg',
    displayName: profile.displayName,
  }
  try {
    dispatch({ type: ADD_TO_WISHLIST, payload: product })
    await firestore.update(`products/${product.id}`, {
      [`wishlistAdders.${user.uid}`]: wishlistAdder,
    })
    await firestore.set(`wishlist/${product.id}_${user.uid}`, {
      productId: product.id,
      userUid: user.uid,
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeFromWishlist = (product) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  dispatch({ type: DELETE_TO_WISHLIST, payload: product })
  try {
    await firestore.update(`products/${product.id}`, {
      [`wishlistAdders.${user.uid}`]: firestore.FieldValue.delete(),
    })
    await firestore.delete(`wishlist/${product.id}_${user.uid}`)
  } catch (error) {
    console.log(error)
  }
}

export const getUserWishlist = (userUid) => async (dispatch, getState) => {
  const firestore = firebase.firestore()
  let cartRef = firestore.collection('wishlist')
  let query = cartRef.where('userUid', '==', userUid)
  try {
    let querySnap = await query.get()
    let products = []
    for (let i = 0; i < querySnap.docs.length; i++) {
      let pro = await firestore
        .collection('products')
        .doc(querySnap.docs[i].data().productId)
        .get()
      products.push({ ...pro.data(), id: pro.id })
    }

    dispatch({ type: FETCH_WISHLIST, payload: { products } })
  } catch (error) {
    console.log(error)
  }
}

export const addReview = (product, values) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    const profile = getState().firebase.profile
    const newReview = {
      rating: values.rating,
      comment: values.comment,
      photoURL: profile.photoURL || '../../../assets/icons/user-circle.svg',
      displayName: profile.displayName,
      addDate: firestore.FieldValue.serverTimestamp(),
    }
    try {
      await firestore.update(`products/${product.id}`, {
        [`reviews.${user.uid}`]: newReview,
      })
      await firestore.set(`review/${product.id}_${user.uid}`, {
        productId: product.id,
        userUid: user.uid,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addAddress = (values) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    const newAddress = values
    try {
      await firestore.update(`users/${user.uid}`, {
        newAddress,
        email: newAddress.email,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addAddressTwo = (values) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    const newAddressTwo = values
    try {
      await firestore.update(`users/${user.uid}`, {
        newAddressTwo,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeNewAddress = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`users/${user.uid}`, {
      [`newAddress`]: firestore.FieldValue.delete(),
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeNewAddressTwo = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`users/${user.uid}`, {
      [`newAddressTwo`]: firestore.FieldValue.delete(),
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeReview = (product) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`products/${product.id}`, {
      [`reviews.${user.uid}`]: firestore.FieldValue.delete(),
    })
    await firestore.delete(`review/${product.id}_${user.uid}`)
  } catch (error) {
    console.log(error)
  }
}

// export const confirmOrder = (
//   totalAmount,
//   cartob,
//   address,
//   mpesanumber
// ) => async (dispatch, getState, { getFirestore, getFirebase }) => {
//   dispatch(asyncActionStart());
//   const firestore = getFirestore();
//   const firebase = getFirebase();
//   const user = firebase.auth().currentUser;
//   const products = cartob;
//   try {
//     await firestore.add(
//       {
//         collection: "users",
//         doc: user.uid,
//         subcollections: [{ collection: "confirmed_orders" }]
//       },
//       {
//         products,
//         amount: totalAmount,
//         street: address.Address,
//         city: address.City,
//         name: address.Name,
//         postcode: address.postcode,
//         phone: address.phone,
//         email: address.email,
//         mpesanumber: parseInt(mpesanumber),
//         date: firestore.FieldValue.serverTimestamp()
//       }
//     );

//     await firestore
//       .update(`users/${user.uid}`, {
//         [`cart`]: {}
//       })
//       .then(function() {
//         /**
//          * After order confirmation, we will trigger this function for mPesa payment
//          * @type {firebase.functions.HttpsCallable}
//          */
//         var payMpesa = firebase.functions().httpsCallable("payMpesa");
//         payMpesa({
//           amount: totalAmount,
//           mpesanumber: parseInt("254" + mpesanumber)
//           //mpesanumber: parseInt(2540712293999)
//         })
//           .then(function(result) {
//             // Read result of the Cloud Function.
//             //console.log("Mpesa response: " + JSON.stringify(result));

//             const payResponse = result.data;

//             if (typeof payResponse.ConversationID !== "undefined") {
//               for (let cartKey in cartob) {
//                 var negativecartProductQuantity =
//                   Math.sign(-1) * cartob[cartKey].quantity;
//                 firestore.update(`products/${cartKey}`, {
//                   [`remainingQuantity`]: firebase.firestore.FieldValue.increment(
//                     negativecartProductQuantity
//                   ),
//                   [`sold`]: firebase.firestore.FieldValue.increment(
//                     Math.abs(cartob[cartKey].quantity)
//                   )
//                 });
//               }
//               firestore.add(
//                 {
//                   collection: "orders"
//                 },
//                 {
//                   products,
//                   amount: totalAmount,
//                   street: address.Address,
//                   city: address.City,
//                   name: address.Name,
//                   postcode: address.postcode,
//                   phone: address.phone,
//                   email: address.email,
//                   status: "approved",
//                   mpesanumber: parseInt(mpesanumber),
//                   date: firestore.FieldValue.serverTimestamp(),
//                   userid: user.uid
//                 }
//               );
//               toastr.success("", "Your order is complete!");
//             } else {
//               toastr.error("", "Oops! some error occured, please try again");
//             }
//           })
//           .catch(function(error) {
//             toastr.error("", "Oops! some error occured, please try again");
//           });
//       })
//       .catch(function(error) {
//         console.error("Error: ", error);
//         toastr.error("", "Oops! some error occured, please try again");
//       });
//     dispatch(asyncActionFinish());

//     //toastr.success('', 'Your order is complete!');
//   } catch (error) {
//     console.log(error);
//   }
// };

export const confirmOrder = (totalAmount, cartob, address) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  const products = cartob
  try {
    firestore.add(
      {
        collection: 'orders',
      },
      {
        products,
        amount: totalAmount,
        street: address.Address,
        city: address.City,
        name: address.Name,
        postcode: address.postcode,
        phone: address.phone,
        email: address.email,
        status: 'approved',
        date: firestore.FieldValue.serverTimestamp(),
        userid: user.uid,
      }
    )
    for (let cartKey in cartob) {
      var negativecartProductQuantity = Math.sign(-1) * cartob[cartKey].quantity
      await firestore.update(`products/${cartKey}`, {
        [`remainingQuantity`]: firebase.firestore.FieldValue.increment(
          negativecartProductQuantity
        ),
        [`sold`]: firebase.firestore.FieldValue.increment(
          cartob[cartKey].quantity
        ),
      })
    }
    await firestore.update(`users/${user.uid}`, {
      [`cart`]: {},
      [`verification`]: firestore.FieldValue.delete(),
      [`previousOrder`]: cartob,
      [`previousOrderStatus`]: 'approved',
    })
    toastr.success('', 'Your order is complete!')
  } catch (error) {
    console.log(error)
  }
}

export const addQuantity = (product) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}.quantity`]: firestore.FieldValue.increment(1),
      [`cart.${product.id}.totalPrice`]:
        (product.quantity + 1) *
        (product.price - (product.price * product.discount) / 100),
    })
  } catch (error) {
    console.log(error)
  }
}

export const subtractQuantity = (product) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  try {
    await firestore.update(`users/${user.uid}`, {
      [`cart.${product.id}.quantity`]: firestore.FieldValue.increment(-1),
      [`cart.${product.id}.totalPrice`]:
        (product.quantity - 1) *
        (product.price - (product.price * product.discount) / 100),
    })
  } catch (error) {
    console.log(error)
  }
}

export const addMpesaNumber = (values) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    try {
      await firestore.update(`users/${user.uid}`, {
        [`mpesanumber`]: parseInt(values.mpesa),
        [`verification`]: values.Verification,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeMpesaNumber = () => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    try {
      await firestore.update(`users/${user.uid}`, {
        [`mpesanumber`]: firestore.FieldValue.delete(),
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getOrderHistory = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = firebase.firestore()
    const user = firebase.auth().currentUser
    try {
      let orderQuery = await firestore
        .collection('orders')
        .where('userid', '==', user.uid)
        .get()
      let orders = []

      for (let i = 0; i < orderQuery.docs.length; i++) {
        let order = { ...orderQuery.docs[i].data(), id: orderQuery.docs[i].id }
        orders.push(order)
      }
      dispatch({ type: FETCH_USER_ORDERS, payload: { orders } })
    } catch (error) {
      console.log(error)
    }
  }
}

export const previousOrderDelete = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    try {
      await firestore.update(`users/${user.uid}`, {
        [`previousOrderStatus`]: firestore.FieldValue.delete(),
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const notify = (product) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    const useremail = {
      email: user.email,
    }
    try {
      await firestore.update(`products/${product.id}`, {
        [`notify.${user.uid}`]: useremail,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const onToken = (token) => {
  return async () => {
    const gettheEmail = firebase.app().functions('asia-south1').httpsCallable('stripetoken')
    try {
      const response = await gettheEmail({token})
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
}
