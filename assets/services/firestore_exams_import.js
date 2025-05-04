import { collection, doc, setDoc, db } from "../../firebase.js";

async function getData() {
	try {
		const response = await fetch("../../data/exams.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error.message);
	}
}
const examsData = await getData();

const createExamCollection = async (exams) => {
	try {
		for (const exam of exams) {
			await setDoc(doc(db, "exams", exam.id), {
				subjectTitle: exam.subjectTitle,
				id: exam.id,
				description: exam.description,
				duration: exam.duration,
				passingGrade: exam.passingGrade
			});
		}
		console.log("All exams added successfully!");
	} catch (error) {
		console.error("Error adding exams:", error);
		throw error;
	}
};

createExamCollection(examsData.exams);
