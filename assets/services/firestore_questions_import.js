import { collection, doc, setDoc, db } from "../../firebase.js";

async function getData() {
	try {
		const response = await fetch("../../data/htmlQuestions.json");
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		return json;
	} catch (error) {
		console.error(error.message);
	}
}
const questionsData = await getData();
console.log(questionsData);

const createQuestionsSubCollection = async (questions) => {
	const subRef = doc(db, "exams", "WEB101");
	const examRef = collection(subRef, "question");

	questions.map(async (question) => {
		await setDoc(doc(examRef, question.id), {
			examId: question.examId,
			id: question.id,
			questionText: question.questionText,
			options: question.options,
            correctAnswer: question.correctAnswer,
			difficulty: question.difficulty,
			points: question.points
		});
	});
};

createQuestionsSubCollection(questionsData.questions)