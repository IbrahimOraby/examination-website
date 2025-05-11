import { signoutUser } from "../services/auth_service.js";

export default async function handleSignout() {
	try {
		await signoutUser();
		localStorage.removeItem("uid");
		window.location.replace("../../index.html");
	} catch (error) {
		console.log("Error while logging out", error);
	}
}
