// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0rQXSSaOU1q5ORW8LRc-Q8bY2_gWNLjk",
  authDomain: "motorsport-96687.firebaseapp.com",
  projectId: "motorsport-96687",
  storageBucket: "motorsport-96687.appspot.com",
  messagingSenderId: "1072498012526",
  appId: "1:1072498012526:web:0879672946fb982577917f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);