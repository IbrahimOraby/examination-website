const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
	window.location.replace("../../pages/welcome-page.html");
}
