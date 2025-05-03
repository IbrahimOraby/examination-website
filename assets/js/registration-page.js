import { userSignup } from "../services/auth_service.js";

const form = document.querySelector("form");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const reEnterPassword = document.querySelector("#re-enter-password");

form.addEventListener("submit", handleFormSubmit);

function toggleErrorVisibility(id, show) {
	const el = document.getElementById(id);
	el.style.visibility = show ? "visible" : "hidden";
}

async function handleFormSubmit(e) {
	e.preventDefault();

	const nameRegEx = /^[A-Za-z]{2,}$/;
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegEx = /^[A-Za-z0-9]{8,}$/;

	const userFirstName = fname.value.trim();
	const userLastName = lname.value.trim();
	const userName = `${userFirstName} ${userLastName}`;
	const userEmail = email.value.trim();
	const userPassword = password.value;
	const userReEnterPassword = reEnterPassword.value;

	let hasError = false;

	if (!nameRegEx.test(userFirstName)) {
		toggleErrorVisibility("fname-error", true);
		hasError = true;
	} else {
		toggleErrorVisibility("fname-error", false);
	}

	if (!nameRegEx.test(userLastName)) {
		toggleErrorVisibility("lname-error", true);
		hasError = true;
	} else {
		toggleErrorVisibility("lname-error", false);
	}

	if (!emailRegEx.test(userEmail)) {
		toggleErrorVisibility("email-error", true);
		hasError = true;
	} else {
		toggleErrorVisibility("email-error", false);
	}

	if (!passwordRegEx.test(userPassword)) {
		toggleErrorVisibility("password-error", true);
		hasError = true;
	} else {
		toggleErrorVisibility("password-error", false);
	}

	if (userPassword !== userReEnterPassword) {
		toggleErrorVisibility("re-enter-password-error", true);
		hasError = true;
	} else {
		toggleErrorVisibility("re-enter-password-error", false);
	}

	if (hasError) return;

	try {
		const userCredential = await userSignup(userName, userEmail, userPassword);
		console.log("User signed up:", userCredential);
		alert("You signed up successfully");
		window.location.replace("../../index.html");
	} catch (error) {
		console.error("Signup error:", error.message);
		const signupErrorEl = document.getElementById("sign-up-error");
		if (error.code) {
			signupErrorEl.style.visibility = "visible";
			switch (error.code) {
				case "auth/email-already-in-use":
					signupErrorEl.textContent =
						"This email is already registered. Please log in or use a different one.";
					break;
				default:
					signupErrorEl.textContent =
						"Something went wrong. Please try again later.";
					break;
			}
		} else {
			signupErrorEl.style.visibility = "hidden";
			signupErrorEl.textContent = "Default";
		}
	}
}
