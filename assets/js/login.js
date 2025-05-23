import { userSignin } from "../services/auth_service.js";

const form = document.getElementById("login-form");
const loginbtn = document.getElementById("login-btn");
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
	window.location.replace("../../pages/welcome-page.html");
}


function loginError(Emsg, Pmsg) {
	const emailError = document.getElementById("email-error");
	const passwordError = document.getElementById("password-error");
	emailError.textContent = Emsg;
	emailError.style.display = Emsg ? "block" : "none";
	passwordError.textContent = Pmsg;
	passwordError.style.display = Pmsg ? "block" : "none";
}

function clearLoginErrors() {
	const emailError = document.getElementById("email-error");
	const passwordError = document.getElementById("password-error");

	emailError.style.display = "none";
	passwordError.style.display = "none";
}
if (form) {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const email = document.getElementById("inputEmail1").value;
		const password = document.getElementById("inputPassword1").value;

		try {
			const userCredential = await userSignin(email, password);
			const { user } = userCredential;

			//set user id & user name in localstorage
			localStorage.setItem("uid", user.uid);
			localStorage.setItem("userName", user.displayName);
			localStorage.setItem('isLoggedIn', 'true');

			clearLoginErrors();
			window.location.replace("../../pages/welcome-page.html");
			// location.href = "/pages/welcome-page.html";
		} catch (error) {
			loginError("", "Invalid email or password. Please try again.");
			console.log(error);
		}
	});
}

