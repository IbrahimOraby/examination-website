import { getAuth, onAuthStateChanged } from "../../firebase.js";
import { signoutUser } from "../services/auth_service.js";
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
	} else {
		console.log("No user signed in");
	}
});

sigoutBtn.addEventListener("click", handleSignout);

async function handleSignout() {
	try {
		await signoutUser();
		window.location.replace("../../index.html");
	} catch (error) {
		console.log("Error while logging out", error);
	}
}
