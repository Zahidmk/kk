import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_zJ1c-MikPvyNCMa9JKWMIFR4ulwPzIY",
  authDomain: "samtcs-1520c.firebaseapp.com",
  projectId: "samtcs-1520c",
  storageBucket: "samtcs-1520c.appspot.com",
  messagingSenderId: "1070716222382",
  appId: "1:1070716222382:web:e0a056d8dd19254cac663f",
  measurementId: "G-EE4SMQL93N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Get a reference to the Authentication module
const auth = getAuth(app);

// Export the necessary Firebase modules
export { db, auth, getFirestore, collection, addDoc };

