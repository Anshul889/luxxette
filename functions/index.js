const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

const stripe = require('stripe')(functions.config().stripe.secretkey)

//receives a token from the client and confirms the payment using the stripe sdk. If succesful, it creates an order on the database
exports.stripetoken = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const token = data.token.id
    const amount = data.price * 100
    const friendcode = data.friendcode
    const userId = context.auth.uid
    if (userId) {
      //get user data from server

      const userRef = db.doc(`users/${userId}`)
      const userSnap = await userRef.get()
      const {
        email,
        Address,
        postcode,
        City,
        Name,
        phone,
        refcode
      } = userSnap.data().newAddress
      const cart = userSnap.data().cart

      //create stripe charge

      const charge = await stripe.charges.create({
        amount,
        source: token, //obtained from the client
        currency: 'usd',
        description: `Charge from ${Name}`,
      })

      console.log(`paid : ${charge.paid}`)

      //add order to database

      await db.collection(`orders`).add({
        email,
        address: Address,
        postcode,
        phone,
        amount: data.price,
        products: cart,
        userid: userId,
        city: City,
        name: Name,
        status: 'approved',
        time: admin.firestore.FieldValue.serverTimestamp(),
      })

      //adjust inventory on database

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

      //clear user cart and set order status

      await userRef.update({
        [`cart`]: {},
        [`previousOrder`]: cart,
        [`previousOrderStatus`]: 'approved',
        [`friendcode`]: admin.firestore.FieldValue.delete(),
      })

      //send confirmation email

      await db.collection('mail').add({
        to: email,
        message: {
          subject: 'Order Confirmation',
          html: `hi ${Name}, thank you for your purchase`,
        },
      })

      // add coupon to friends account for referral and send email notification to friend

      if (friendcode !== refcode) {
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
          const friend = await db
            .collection('users')
            .doc(`${response.docs[0]._ref._path.segments[1]}`)
            .get()
          const friendsemail = friend.data().email
          const friendsname = friend.data().displayName
          await db.collection('mail').add({
            to: friendsemail,
            message: {
              subject: `10% off on your next purchase`,
              html: `hi ${friendsname}, your friend ${Name}, used your referral code so you'll get 10% off on your next purchase`,
            },
          })
        }
      }
      return 'payment succesful'
    } else {
      return 'Login to continue'
    }
  })

// receives token from the client after permission is granted

exports.pushmessagingtoken = functions
  .region('asia-south1')
  .https.onCall(async (data, context) => {
    const token = data.token
    await db.collection('tokens').add({
      token,
      date: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log('token added')
    return 'token added'
  })

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('* 11 * * *')
  .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async (context) => {
    const tokensQuery = await db.collection('tokens').limit(50).get()
    let tokens = []

    for (let i = 0; i < tokensQuery.docs.length; i++) {
      let token = tokensQuery.docs[i].data().token
      tokens.push(token)
    }

    const message = {
      notification: {
        title: 'Summer sale has started',
        body: 'Upto 50% off on select items',
      },
      tokens,
    }
    try {
      await admin.messaging().sendMulticast(message)
    } catch (error) {
      console.log(error)
    }
  })
