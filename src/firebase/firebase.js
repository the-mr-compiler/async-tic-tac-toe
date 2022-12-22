// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyFku2GaedLY1vleOCxC9URtHPyOT4vLw",
  authDomain: "rescue-army.firebaseapp.com",
  projectId: "rescue-army",
  // storageBucket: "rescue-army.appspot.com",
  messagingSenderId: "988047070868",
  appId: "1:988047070868:web:3a33f2630c791a970f8681",
  measurementId: "G-1QZNWCJ47D",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA202_8Rt0XxosJsQE87aA6yTUOINN9OcA",
//   authDomain: "tic-tac-toe-851bb.firebaseapp.com",
//   projectId: "tic-tac-toe-851bb",
//   storageBucket: "tic-tac-toe-851bb.appspot.com",
//   messagingSenderId: "192874917372",
//   appId: "1:192874917372:web:c8de964c7a23f13a341679",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
