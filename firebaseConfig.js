// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTQmOVkzuDN2H2E48kuKbW1kRh6vUu9VU",
  authDomain: "test-bot-aume.firebaseapp.com",
  projectId: "test-bot-aume",
  storageBucket: "test-bot-aume.appspot.com",
  messagingSenderId: "547250967068",
  appId: "1:547250967068:web:1f71458f1374607ce685d9",
  measurementId: "G-N8J793BBRB",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
// export const storage = firebase.storage();
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const analytics = firebase.analytics();
