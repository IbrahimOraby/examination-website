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
    const answersObj = data.options;
    const answersArr = Object.values(answersObj);
    const question = new Question(
      doc.id,
      data.questionText,
      answersArr,
      data.correctAnswer
    );
    questionsArr.push(question);
    // console.log(questionsArr);
  });

  shuffle(questionsArr);
  displayQuestion();
}

function displayQuestion() {
  const Q = questionsArr[currentIndex];
  document.getElementById("question-text").textContent = Q.text;

  const options = document.querySelectorAll("input[type='radio']");
  options.forEach((radio, index) => {
    radio.checked = false;
    radio.value = Q.answers[index] || "";
    const label = document.querySelector(`label[for='${radio.id}']`);
    if (label) {
      label.textContent = Q.answers[index] || "";
    }
  });
}

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < questionsArr.length - 1) {
    currentIndex++;
    document.getElementById("question-number").textContent = currentIndex + 1;
    displayQuestion();
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("question-number").textContent = currentIndex + 1;
    displayQuestion();
  }
});
getQuestionsData();
