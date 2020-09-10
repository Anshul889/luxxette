const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

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

exports.testfunction = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const userId = context.auth.uid
    const userRef = db.doc(`users/${userId}`)
    const userSnap = await userRef.get()
    const email = userSnap.data().email

    return { email }
  })

exports.stripetoken = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const token = data.token.id
    const price = data.price
    const userId = context.auth.uid
    if (userId) {
      const userRef = db.doc(`users/${userId}`)
      const userSnap = await userRef.get()
      const email = userSnap.data().newAddress.email
      const address = userSnap.data().newAddress.Address
      const postcode = userSnap.data().newAddress.postcode
      const phone = userSnap.data().newAddress.phone
      const cart = userSnap.data().cart
      const city = userSnap.data().newAddress.City
      await db.collection(`orders`).add({
        email,
        address,
        postcode,
        phone,
        price,
        products: cart,
        userid: userId,
        city,
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
      })
      console.log('succesful')
      return 'paymnent succesful'
    } else {
      return 'Login to continue'
    }
  })
