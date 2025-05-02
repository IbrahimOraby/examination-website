import { userSignin } from "../services/auth_service.js";
const form = document.getElementById("login-form");
const loginbtn = document.getElementById("login-btn");

export function loginError(Emsg, Pmsg) {
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  emailError.textContent = Emsg;
  emailError.style.display = Emsg ? "block" : "none";
  passwordError.textContent = Pmsg;
  passwordError.style.display = Pmsg ? "block" : "none";
}

export function clearLoginErrors() {
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
      clearLoginErrors();
    } catch (error) {
      loginError("", "Invalid email or password. Please try again.");
      // console.log(error);
    }
  });
}
