import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-bbVGd_plTlp6bPx6WidOk4ZdVJTCiVQ",
  authDomain: "learn-lingo-b855d.firebaseapp.com",
  projectId: "learn-lingo-b855d",
  storageBucket: "learn-lingo-b855d.appspot.com",
  messagingSenderId: "281514657792",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
