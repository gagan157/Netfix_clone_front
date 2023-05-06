// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcHnVhzoAua1jI6g-hmzxYrLWY_Ow4z1A",
  authDomain: "netflix-clone-e7d83.firebaseapp.com",
  projectId: "netflix-clone-e7d83",
  storageBucket: "netflix-clone-e7d83.appspot.com",
  messagingSenderId: "146873520209",
  appId: "1:146873520209:web:256ff0f1dda2fa38ade870",
  measurementId: "G-7V1TYPVNGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth()
const provider = new GoogleAuthProvider()

export {auth,provider}