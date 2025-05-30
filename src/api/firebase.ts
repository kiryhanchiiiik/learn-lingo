import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-bbVGd_plTlp6bPx6WidOk4ZdVJTCiVQ",
  authDomain: "learn-lingo-b855d.firebaseapp.com",
  databaseURL:
    "https://learn-lingo-b855d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-b855d",
  storageBucket: "learn-lingo-b855d.firebasestorage.app",
  messagingSenderId: "281514657792",
  appId: "1:281514657792:web:d0de9a1633ca281a4c70e5",
  measurementId: "G-9QNZ56ZRZG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
