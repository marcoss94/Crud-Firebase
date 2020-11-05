import firebase from "firebase/app";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB4fGGLNYK-mVhjr-5YDzU7wozXBIOsju0",
  authDomain: "crud-react-e1740.firebaseapp.com",
  databaseURL: "https://crud-react-e1740.firebaseio.com",
  projectId: "crud-react-e1740",
  storageBucket: "crud-react-e1740.appspot.com",
  messagingSenderId: "747395100014",
  appId: "1:747395100014:web:bddf10f370f39e01bae57f",
  measurementId: "G-4MKJT2L23V",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = fb.firestore();
