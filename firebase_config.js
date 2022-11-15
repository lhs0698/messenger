import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); export를 해줘야 한다.
export const db = getFirestore(app);

export default firebaseConfig;
