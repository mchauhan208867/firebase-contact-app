// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrY9QmiqCHmIsRECPX2Uf5CDYwIEVcYuE",
  authDomain: "project-5-f1b59.firebaseapp.com",
  projectId: "project-5-f1b59",
  storageBucket: "project-5-f1b59.appspot.com",
  messagingSenderId: "101763662520",
  appId: "1:101763662520:web:b4b45aaff1fe7577a26a4d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 