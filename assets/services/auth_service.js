import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile
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
