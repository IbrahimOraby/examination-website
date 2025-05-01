import { userSignup } from "../services/auth_service.js";

const form = document.querySelector("form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const reEnterPassword = document.querySelector("#re-enter-password");

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(e) {
	e.preventDefault();
	const nameRegEx = /^[A-Za-z]{2,}$/;
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegEx = /^[A-Za-z0-9]{8,}$/;
	const userFisrtName = fname.value.trim();
	const userLastName = lname.value.trim();
	const userName = `${userFisrtName} ${userLastName}`;
	const userEmail = email.value.trim();
	const userPassword = password.value;
	const userReEnterPassword = reEnterPassword.value;

	if (!nameRegEx.test(userFisrtName)) {
		throw new Error("should be a series of alphabetical characters.");
	}

	if (!nameRegEx.test(userLastName)) {
		throw new Error("should be a series of alphabetical characters.");
	}

	if (!emailRegEx.test(userEmail)) {
		throw new Error(
			"Oops! That doesn't look like a valid email. Try something like name@example.com."
		);
	}

	if (!passwordRegEx.test(userPassword)) {
		throw new Error(
			"Password must be at least 8 characters long and contain only letters and numbers."
		);
	}

	if (userPassword !== userReEnterPassword) {
		throw new Error("It should match the password you entered.");
	}

	try {
		const userCredential = await userSignup(userName, userEmail, userPassword);
		console.log("User signed up:", userCredential);
		alert("You signed up successfully");
		window.location.replace("../../index.html");
	} catch (error) {
		console.error("Signup error:", error.message);
	}
}
