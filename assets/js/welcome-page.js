import { getAuth, onAuthStateChanged } from "../../firebase.js";
const auth = getAuth();
const user = auth.currentUser;
let userNameSpan = document.getElementById("userName");

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in
		console.log(user);
        const fullName = user.displayName;
        const firstName = fullName.split(" ")[0];
		userNameSpan.textContent = firstName;
	} else {
		console.log("No user signed in");
	}
});
