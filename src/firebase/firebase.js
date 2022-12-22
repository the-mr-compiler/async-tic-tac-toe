import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA202_8Rt0XxosJsQE87aA6yTUOINN9OcA",
  authDomain: "tic-tac-toe-851bb.firebaseapp.com",
  projectId: "tic-tac-toe-851bb",
  storageBucket: "tic-tac-toe-851bb.appspot.com",
  messagingSenderId: "192874917372",
  appId: "1:192874917372:web:c8de964c7a23f13a341679",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
