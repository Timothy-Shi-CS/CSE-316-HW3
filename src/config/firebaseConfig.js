import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCJXSdVfc2vDHeUN1bqfqC-pQ6kABIIKLQ",
    authDomain: "todo-rrf-316-65bd4.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-65bd4.firebaseio.com",
    projectId: "todo-rrf-316-65bd4",
    storageBucket: "todo-rrf-316-65bd4.appspot.com",
    messagingSenderId: "236295649300",
    appId: "1:236295649300:web:67c27923ce25623ec00f01",
    measurementId: "G-XWVBJRZET2"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;