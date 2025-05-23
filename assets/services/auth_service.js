import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut
} from "../../firebase.js";

// Sign up
export const userSignup = async (userName, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(userCredential);
		await updateProfile(userCredential.user, {
			displayName: userName
		});
		console.log(`${userCredential.user.email} signed up`);
		return userCredential;
	} catch (error) {
		throw error; // Re-throw the error if you want calling code to handle it
	}
};

// sign in
export const userSignin = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log("Logged in:");

		return userCredential;
	} catch (error) {
		throw error;
		// loginError("", "Invalid email or password. Please try again.");
		// console.log(error);
	}
};

// sign out
export const signoutUser = () => {
	try {
		return signOut(auth);
	} catch (error) {
		throw error;
	}
};
