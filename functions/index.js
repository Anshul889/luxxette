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
