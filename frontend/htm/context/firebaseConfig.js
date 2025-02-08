// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFdoeOPOg6dsLcgQY4hvD4iTUh9c_3bQc",
  authDomain: "class-buddy-10a2c.firebaseapp.com",
  projectId: "class-buddy-10a2c",
  storageBucket: "class-buddy-10a2c.appspot.com",
  messagingSenderId: "518988086486",
  appId: "1:518988086486:web:c5bf35d21048dddd71dd77",
  measurementId: "G-77RR8J3N5F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
