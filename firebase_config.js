import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfigR6 = {
  apiKey: "AIzaSyDlXvB48UvZRD1Xar-mkpTWWdQz6vY3nus",
  authDomain: "e-avp-4a732.firebaseapp.com",
  projectId: "e-avp-4a732",
  storageBucket: "e-avp-4a732.appspot.com",
  messagingSenderId: "694772972005",
  appId: "1:694772972005:web:a2e0b788b7b96f2fffd70c",
  measurementId: "G-BDVQYDEP1K"
};

const firebaseConfig = {
  apiKey: "AIzaSyAlCHMsF0iHBw0IfBkMKeKnwgoGJlI7zcM",
  authDomain: "chat-9f718.firebaseapp.com",
  databaseURL:
    "https://chat-9f718-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-9f718",
  storageBucket: "chat-9f718.appspot.com",
  messagingSenderId: "1004261001729",
  appId: "1:1004261001729:web:38ea69218a57a243054e00",
  measurementId: "G-8CPXXFTQJF",
};

export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); export를 해줘야 한다.
export const db = getFirestore(app);