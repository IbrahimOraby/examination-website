import { getExamsResultsData } from "../services/firestore_service.js";

const uid = localStorage.getItem("uid");

async function handleExamsResults() {
	const examsResults = await getExamsResultsData(uid);
	console.log(examsResults);
}

handleExamsResults();
