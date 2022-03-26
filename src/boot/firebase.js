import * as firebase from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBQ8yxl0S2XKEkyFB2GiGiZsl0TLJBRAO8",
  authDomain: "awesome-todo-d44d0.firebaseapp.com",
  databaseURL: "https://awesome-todo-d44d0-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-d44d0",
  storageBucket: "awesome-todo-d44d0.appspot.com",
  messagingSenderId: "124922956058",
  appId: "1:124922956058:web:f08c5528eed6ac681b44a3",
  measurementId: "G-M21P1FLHC1"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firebaseDb = getDatabase();
export { firebaseAuth, firebaseDb }
