import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCASNdlQfyGWs92IAcGEy5Klwv8fw674f0",
	authDomain: "examination-website-b5f2f.firebaseapp.com",
	projectId: "examination-website-b5f2f",
	storageBucket: "examination-website-b5f2f.firebasestorage.app",
	messagingSenderId: "826852221065",
	appId: "1:826852221065:web:4d683ae23f1d852de2a658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
