import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDszVO3XwuuFKoEifj2RBWfeEcb1lZHe2I",
  authDomain: "luxxette.firebaseapp.com",
  databaseURL: "https://luxxette.firebaseio.com",
  projectId: "luxxette",
  storageBucket: "luxxette.appspot.com",
  messagingSenderId: "767219364985",
  appId: "1:767219364985:web:54a00ebc069fa7473890a8",
  measurementId: "G-CQWW0N8CD6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.functions();
firebase.analytics();
firebase.firestore().enablePersistence();

export default firebase;
