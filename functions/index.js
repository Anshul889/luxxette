const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
const messaging = admin.messaging()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.helloworld = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const userId = context.auth.uid
    const userRef = db.doc(`users/${userId}`)
    const userSnap = await userRef.get()
    const email = userSnap.data().email
    console.log('hello world')
    return { email }
  })

exports.stripetoken = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const token = data.token.id
    const price = data.price
    const friendcode = data.friendcode
    const userId = context.auth.uid
    if (userId) {
      const userRef = db.doc(`users/${userId}`)
      const userSnap = await userRef.get()
      const {
        email,
        Address,
        postcode,
        City,
        Name,
        phone,
      } = userSnap.data().newAddress
      const cart = userSnap.data().cart
      await db.collection(`orders`).add({
        email,
        address: Address,
        postcode,
        phone,
        price,
        products: cart,
        userid: userId,
        city: City,
        name: Name,
        status: 'approved',
        time: admin.firestore.FieldValue.serverTimestamp(),
      })
      for (let cartKey in cart) {
        var negativecartProductQuantity = Math.sign(-1) * cart[cartKey].quantity
        db.doc(`products/${cartKey}`).update({
          [`remainingQuantity`]: admin.firestore.FieldValue.increment(
            negativecartProductQuantity
          ),
          [`sold`]: admin.firestore.FieldValue.increment(
            cart[cartKey].quantity
          ),
        })
      }
      await userRef.update({
        [`cart`]: {},
        [`previousOrder`]: cart,
        [`previousOrderStatus`]: 'approved',
        [`friendcode`]: admin.firestore.FieldValue.delete(),
      })
      if (friendcode) {
        const response = await db
          .collection('users')
          .where('refcode', '==', friendcode)
          .get()
        if (response.docs.length === 1) {
          await db
            .collection('users')
            .doc(`${response.docs[0]._ref._path.segments[1]}`)
            .update({
              [`coupons`]: admin.firestore.FieldValue.increment(1),
              [`totalreferrals`]: admin.firestore.FieldValue.increment(1),
            })
        }
      }
      return 'paymnent succesful'
    } else {
      return 'Login to continue'
    }
  })
