// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1RybaMxvA0JuNPftdB2KPoQ-OpjofVvI",
  authDomain: "roboastroed.firebaseapp.com",
  projectId: "roboastroed",
  storageBucket: "roboastroed.appspot.com",
  messagingSenderId: "740077916766",
  appId: "1:740077916766:web:abf3e7025f5fc385d8dacf",
  measurementId: "G-WDE4SSQ7WK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
