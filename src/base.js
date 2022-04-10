import  Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCIrxuZnRa_G7jlRHXV12RKobIeDmPuJbI",
  authDomain: "catch-of-the-day-carlosht.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-carlosht-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export;

export { firebaseApp };

// this is a default export;

export default base;
