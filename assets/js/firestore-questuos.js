import { db, collection, getDocs } from "../../firebase.js";

class Question {
  constructor(id, text, answers, correctAnswer) {
    (this.id = id),
      (this.text = text),
      (this.answers = answers),
      (this.correctAnswer = correctAnswer);
  }
}

let questionsArr = [];
let currentIndex = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function getQuestionsData() {
  const qDocs = await getDocs(collection(db, "exams", "WEB101", "question"));
  qDocs.forEach((doc) => {
    const data = doc.data();
    const question = new Question(
      doc.id,
      data.questionText,
      data.options,
      data.correctAnswer
    );
    questionsArr.push(question);
  });

  shuffle(questionsArr);
  console.log(questionsArr);
}

getQuestionsData();
