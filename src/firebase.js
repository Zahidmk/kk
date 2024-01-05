// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";

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

const db = firebase.firestore();

export const addExpenseToFirestore = (newExpense) => {
  return db.collection("expenses").add(newExpense);
};

export const getExpensesFromFirestore = () => {
  return db.collection("expenses").get();
};
