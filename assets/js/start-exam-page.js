import { getAllExams } from "../services/firestore_service.js";
import Exam from "./Classes/Exam.js";
import handleSignout from "./handleSingout.js";

const sigoutBtn = document.getElementById("signout-btn");
const startExamContentDiv = document.getElementById("start-exam-content");
const userRole = localStorage.getItem("userRole");

// create instances of the class Exam from the firestore exams data
async function loadExams() {
	const examsData = await getAllExams();
	return examsData.map(
		(data) =>
			new Exam(
				data.id,
				data.subjectTitle,
				data.description,
				data.passingGrade,
				data.duration
			)
	);
}

const loadExamsTableData = async () => {
	try {
		if (userRole === "teacher") {
			document.querySelector(".loader").classList.add("d-none");
      startExamContentDiv.innerHTML = `
      <div><p>❌Sorry, the feature for adding exams isn't available yet.❌</p><div/>
      `
		} else if (userRole === "student") {
			const examsArr = await loadExams();
			document.querySelector(".loader").classList.add("d-none");

			//h1
			const h1 = document.createElement("h1");
			h1.innerText = "Exams";
			h1.classList.add("mb-3", "table-title");

			//div table container
			const tableContainerDiv = document.createElement("div");
			tableContainerDiv.classList.add("table-container", "p-4", "rounded-3");

			// table
			const table = document.createElement("table");
			table.classList.add("table");

			//thead
			const thead = document.createElement("thead");

			//tr head
			const headTr = document.createElement("tr");

			//th No.
			const noTh = document.createElement("th");
			noTh.innerText = "No.";

			//th Exam
			const examTh = document.createElement("th");
			examTh.innerText = "Exam";

			//th time
			const timeTh = document.createElement("th");
			timeTh.innerText = "Time";

			//th start
			const startTh = document.createElement("th");
			startTh.innerText = "Start";

			startExamContentDiv.appendChild(h1);
			startExamContentDiv.appendChild(tableContainerDiv);
			tableContainerDiv.appendChild(table);
			table.appendChild(thead);
			thead.appendChild(headTr);
			headTr.appendChild(noTh);
			headTr.appendChild(examTh);
			headTr.appendChild(timeTh);
			headTr.appendChild(startTh);

			const tbody = document.createElement("tbody");

			examsArr.forEach((exam, index) => {
				const tr = document.createElement("tr");

				// No.
				const noTd = document.createElement("td");
				noTd.textContent = `#${index + 1}`;
				tr.appendChild(noTd);

				// Exam title
				const examTd = document.createElement("td");
				examTd.textContent = exam.subjectTitle;
				tr.appendChild(examTd);

				// Time
				const timeTd = document.createElement("td");
				// timeTd.textContent = `${exam.duration} mins`;
				timeTd.textContent = `${exam.duration} mins`;
				tr.appendChild(timeTd);

				// Start
				const startTd = document.createElement("td");
				const startButton = document.createElement("button");
				startButton.textContent = "▶";
				startButton.className = "start-exam-btn";
				startButton.addEventListener("click", () =>
					startExam(exam.id, exam.subjectTitle, exam.duration)
				);
				startTd.appendChild(startButton);
				tr.appendChild(startTd);

				tbody.appendChild(tr);
			});
			table.appendChild(tbody);
		}
	} catch (error) {
		console.error("Error loading exam data:", error);
	}
};

// redirect to exam page
function startExam(subjectId, subjectTitle, duration) {
	window.location.href = `./exam-page.html?id=${subjectId}&title=${encodeURIComponent(
		subjectTitle
	)}&duration=${duration}`;
}

window.addEventListener("load", loadExamsTableData);
sigoutBtn.addEventListener("click", handleSignout);
