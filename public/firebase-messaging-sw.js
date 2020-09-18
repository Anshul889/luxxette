importScripts("https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js");
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyDszVO3XwuuFKoEifj2RBWfeEcb1lZHe2I",
  authDomain: "luxxette.firebaseapp.com",
  databaseURL: "https://luxxette.firebaseio.com",
  projectId: "luxxette",
  storageBucket: "luxxette.appspot.com",
  messagingSenderId: "767219364985",
  appId: "1:767219364985:web:54a00ebc069fa7473890a8",
  measurementId: "G-CQWW0N8CD6"
});
const messaging = firebase.messaging();
messaging.usePublicVapidKey()