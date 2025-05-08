import { getAllExams } from "../services/firestore_service.js";
import Exam from "./Exam.js";

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
		const examsArr = await loadExams();
		const tbody = document.querySelector("tbody");

		// reset
		tbody.innerHTML = "";

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

			// // Question (placeholder - you might want to count questions)
			// const questionTd = document.createElement("td");
			// questionTd.textContent = "#"; // Or actual count if available
			// tr.appendChild(questionTd);

			// Time
			const timeTd = document.createElement("td");
			timeTd.textContent = `${exam.duration} mins`;
			tr.appendChild(timeTd);

			// Start
			const startTd = document.createElement("td");
			const startButton = document.createElement("button");
			startButton.textContent = "▶";
			startButton.className = "start-exam-btn";
			startButton.addEventListener("click", () => startExam(exam.id));
			startTd.appendChild(startButton);
			tr.appendChild(startTd);

			tbody.appendChild(tr);
		});
	} catch (error) {
		console.error("Error loading exam data:", error);
	}
};

function startExam(examId) {
    // console.log('Starting exam:', examId);
    // redirect to exam page
    window.location.href = `./exam-page.html?id=${examId}`;
}

window.addEventListener("load", loadExamsTableData);
