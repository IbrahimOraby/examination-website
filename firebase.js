import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCASNdlQfyGWs92IAcGEy5Klwv8fw674f0",
  authDomain: "examination-website-b5f2f.firebaseapp.com",
  projectId: "examination-website-b5f2f",
  storageBucket: "examination-website-b5f2f.firebasestorage.app",
  messagingSenderId: "826852221065",
  appId: "1:826852221065:web:4d683ae23f1d852de2a658",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  doc,
  setDoc,
  updateProfile,
  signInWithEmailAndPassword,
  getDocs,
};
