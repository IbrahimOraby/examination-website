import { getAuth, onAuthStateChanged } from "../../firebase.js";
import handleSignout from "./handleSingout.js";
const auth = getAuth();
const user = auth.currentUser;
const userNameSpan = document.getElementById("userName");
const sigoutBtn = document.getElementById("signout-btn");

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		const fullName = user.displayName;
		const firstName = fullName.split(" ")[0];
		userNameSpan.textContent = firstName;

		//set user id in localstorage
		localStorage.setItem("uid", user.uid);
		localStorage.setItem("userName", user.displayName);
	} else {
		console.log("No user signed in");
	}
});

sigoutBtn.addEventListener("click", handleSignout);
