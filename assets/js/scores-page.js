// import { getExamsResultsData } from "../services/firestore_service.js";
// import Exam from "./Exam.js";
// const uid = localStorage.getItem("uid");

// function showLoading() {
// 	const tbody = document.querySelector("tbody");
// 	tbody.innerHTML = `
//         <tr class="loading-row">
//             <td colspan="4">
// 			<div class='d-flex align-items-center justify-content-center my-1'>	
//                 <div class="loader"></div>
// 			</div>
//             </td>
//         </tr>
//     `;
// }

// class ExamResult {
// 	constructor(id, uid, userScore, subjectId) {
// 		this.id = id;
// 		this.uid = uid;
// 		this.userScore = userScore;
// 		this.subjectId = subjectId;
// 	}
// }

// async function loadExamsResults() {
// 	const examResultData = await getExamsResultsData(uid);
// 	return examResultData.map(
// 		(data) =>
// 			new ExamResult(
// 				data.id,
// 				data.uid,
// 				data.userScore,
// 				data.subjectId,
// 			)
// 	);
// }

// const loadExamsResultsTableData = async () => {
// 	try {
// 		showLoading();
// 		const examsResultsArr = await loadExamsResults();
// 		console.log(examsResultsArr);
// 		// const tbody = document.querySelector("tbody");

// 		// // reset
// 		// tbody.innerHTML = "";

// 		// examsArr.forEach((exam, index) => {
// 		// 	const tr = document.createElement("tr");

// 		// 	// No.
// 		// 	const noTd = document.createElement("td");
// 		// 	noTd.textContent = `#${index + 1}`;
// 		// 	tr.appendChild(noTd);

// 		// 	// Exam title
// 		// 	const examTd = document.createElement("td");
// 		// 	examTd.textContent = exam.subjectTitle;
// 		// 	tr.appendChild(examTd);

// 		// 	// // Question (placeholder - you might want to count questions)
// 		// 	// const questionTd = document.createElement("td");
// 		// 	// questionTd.textContent = "#"; // Or actual count if available
// 		// 	// tr.appendChild(questionTd);

// 		// 	// Time
// 		// 	const timeTd = document.createElement("td");
// 		// 	timeTd.textContent = `${exam.duration} mins`;
// 		// 	tr.appendChild(timeTd);

// 		// 	// Start
// 		// 	const startTd = document.createElement("td");
// 		// 	const startButton = document.createElement("button");
// 		// 	startButton.textContent = "▶";
// 		// 	startButton.className = "start-exam-btn";
// 		// 	startButton.addEventListener("click", () => startExam(exam.id));
// 		// 	startTd.appendChild(startButton);
// 		// 	tr.appendChild(startTd);

// 		// 	tbody.appendChild(tr);
// 		// });
// 	} catch (error) {
// 		console.error("Error loading exam data:", error);
// 	}
// };

// window.addEventListener("load", loadExamsResultsTableData);
