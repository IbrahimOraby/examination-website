import handleSignout from "./handleSingout.js";
import { getUserData } from "../services/firestore_service.js";

const uid = localStorage.getItem("uid");
const userName = localStorage.getItem("userName");
const firstName = userName.split(" ")[0];
const content = document.querySelector(".content");
const sigoutBtn = document.getElementById("signout-btn");

async function initUser() {
	try {
		const user = await getUserData(uid);
		localStorage.setItem("userRole", user.role);
		const userRole = localStorage.getItem("userRole");

		if (userRole === "teacher") {
			document.querySelector(".loader").classList.add("d-none");
			content.innerHTML = `
			<h1>Welcome <span id="userName">${firstName}</span>,</h1>
   			<p>You can see your students scores from here.</p>
    		<hr />
    		<a class="btn exam-btn" href="./scores-page.html">Scores</a>
			`;
		} else if (userRole === "student") {
			document.querySelector(".loader").classList.add("d-none");
			content.innerHTML = `
			<h1>Welcome <span id="userName">${firstName}</span>,</h1>
   			<p>Are you ready to take your exam?</p>
    		<hr />
    		<a class="btn exam-btn" href="./start-exam-page.html">Exams</a>
			`;
		}
	} catch (error) {
		console.log("Error rendering", error);
	}
}
initUser();

sigoutBtn.addEventListener("click", handleSignout);
