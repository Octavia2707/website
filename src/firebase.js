// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWA3UpVlpZASuBOP8btd1FoIAx6iUTjuI",
  authDomain: "kidi-4be59.firebaseapp.com",
  projectId: "kidi-4be59",
  storageBucket: "kidi-4be59.firebasestorage.app",
  messagingSenderId: "891097201734",
  appId: "1:891097201734:web:0b9ad59cdb28fc19fb5e47",
  measurementId: "G-FC9N8FRP20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };