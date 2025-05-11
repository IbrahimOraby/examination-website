import { getExamsResultsData } from "../services/firestore_service.js";
import handleSignout from "./handleSingout.js";

const uid = localStorage.getItem("uid");
const sigoutBtn = document.getElementById("signout-btn");

function showLoading() {
	const tbody = document.querySelector("tbody");
	tbody.innerHTML = `
        <tr class="loading-row">
            <td colspan="4">
			<div class='d-flex align-items-center justify-content-center my-1'>	
                <div class="loader"></div>
			</div>
            </td>
        </tr>
    `;
}

class ExamResult {
	constructor(id, uid, userScore, subjectId, subjectTitle) {
		this.id = id;
		this.uid = uid;
		this.userScore = userScore;
		this.subjectId = subjectId;
		this.subjectTitle = subjectTitle;
	}
}

async function loadExamsResults() {
	const examResultData = await getExamsResultsData(uid);
	return examResultData.map(
		(data) =>
			new ExamResult(
				data.id,
				data.uid,
				data.userScore,
				data.subjectId,
				data.subjectTitle
			)
	);
}

const loadExamsResultsTableData = async () => {
	try {
		showLoading();
		const examsResultsArr = await loadExamsResults();
		console.log(examsResultsArr);
		const tbody = document.querySelector("tbody");

		// reset
		tbody.innerHTML = "";

		examsResultsArr.forEach((result, index) => {
			const tr = document.createElement("tr");

			// No.
			const noTd = document.createElement("td");
			noTd.textContent = `#${index + 1}`;
			tr.appendChild(noTd);

			// Exam title
			const examTd = document.createElement("td");
			examTd.textContent = result.subjectTitle;
			tr.appendChild(examTd);

			//Score
			const scoreTd = document.createElement("td");
			scoreTd.textContent = result.userScore + "%";
			tr.appendChild(scoreTd);

			tbody.appendChild(tr);
		});
	} catch (error) {
		console.error("Error loading exam data:", error);
	}
};

window.addEventListener("load", loadExamsResultsTableData);
sigoutBtn.addEventListener("click", handleSignout);
