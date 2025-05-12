import {
	getExamsResultsData,
	getAllExamsResults
} from "../services/firestore_service.js";
import handleSignout from "./handleSingout.js";

const uid = localStorage.getItem("uid");
const userRole = localStorage.getItem("userRole");

const scoresContentDiv = document.getElementById("scores-content");
const sigoutBtn = document.getElementById("signout-btn");

class ExamResult {
	constructor(
		id,
		uid,
		userScore,
		subjectId,
		subjectTitle,
		userName,
		createdAt
	) {
		this.id = id;
		this.uid = uid;
		this.userName = userName;
		this.createdAt = createdAt;
		this.userScore = userScore;
		this.subjectId = subjectId;
		this.subjectTitle = subjectTitle;
	}
}

async function loadExamsResults(uid) {
	if (uid) {
		const examResultData = await getExamsResultsData(uid);
		return examResultData.map(
			(data) =>
				new ExamResult(
					data.id,
					data.uid,
					data.userScore,
					data.subjectId,
					data.subjectTitle,
					data.userName,
					data.createdAt
				)
		);
	} else {
		const allExamResultData = await getAllExamsResults();
		return allExamResultData.map(
			(data) =>
				new ExamResult(
					data.id,
					data.uid,
					data.userScore,
					data.subjectId,
					data.subjectTitle,
					data.userName,
					data.createdAt
				)
		);
	}
}

async function createTable(headers, data) {
	scoresContentDiv.innerHTML = 
	`<div class='d-flex justify-content-center'>
		<div class="loader"></div>
	</div>`;
	await new Promise((resolve) => setTimeout(resolve, 500));
	scoresContentDiv.innerHTML = "";

	// create title
	const h1 = document.createElement("h1");
	h1.innerText = "Scores";
	h1.classList.add("mb-3", "table-title");

	// create table container
	const tableContainerDiv = document.createElement("div");
	tableContainerDiv.classList.add("table-container", "p-4", "rounded-3");

	// table and header
	const table = document.createElement("table");
	table.classList.add("table");

	const thead = document.createElement("thead");
	const headTr = document.createElement("tr");

	// arr => header cells
	headers.forEach((headerText) => {
		const th = document.createElement("th");
		th.innerText = headerText;
		headTr.appendChild(th);
	});
	thead.appendChild(headTr);
	table.appendChild(thead);

	const tbody = document.createElement("tbody");

	// sort by createdAt
	data.sort(
		(a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
	);

	data.forEach((result, index) => {
		const tr = document.createElement("tr");

		const cells = [
			`#${index + 1}`,
			result.userName,
			result.subjectTitle,
			result.userScore + "%",
			result.createdAt.toDate().toLocaleString()
		];

		// If student, skip userName (2nd cell)
		const finalCells = headers.includes("Student Name")
			? cells
			: [cells[0], cells[2], cells[3], cells[4]];

		// cellsArr => row
		finalCells.forEach((cell) => {
			const td = document.createElement("td");
			td.textContent = cell;
			tr.appendChild(td);
		});

		tbody.appendChild(tr);
	});

	table.appendChild(tbody);
	scoresContentDiv.appendChild(h1);
	scoresContentDiv.appendChild(tableContainerDiv);
	tableContainerDiv.appendChild(table);
}

const loadExamsResultsTableData = async () => {
	try {
		let examsResultsArr;
		let headers;

		if (userRole === "student") {
			examsResultsArr = await loadExamsResults(uid);
			headers = ["No.", "Exam", "Score", "Submission Time"];
		} else if (userRole === "teacher") {
			examsResultsArr = await loadExamsResults();
			headers = ["No.", "Student Name", "Exam", "Score", "Submission Time"];
		}

		createTable(headers, examsResultsArr);
	} catch (error) {
		console.error("Error loading exam data:", error);
	}
};

window.addEventListener("load", loadExamsResultsTableData);
sigoutBtn.addEventListener("click", handleSignout);
