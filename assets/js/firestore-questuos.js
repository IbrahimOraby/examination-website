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
let userAnswers = [];
let currentIndex = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function getQuestionsData() {
  // const urlExamId = new URLSearchParams(window.location.search);
  // const examId = urlExamId.get("examId");
  const qDocs = await getDocs(collection(db, "exams", "WEB101", "question"));
  qDocs.forEach((doc) => {
    const data = doc.data();
    const answersObj = data.options;
    const answersArr = Object.entries(answersObj);
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

    const [letter, text] = Q.answers[index] || ["", ""];

    radio.value = letter;
    const label = document.querySelector(`label[for='${radio.id}']`);
    if (label) {
      label.textContent = text;
    }

    radio.checked = userAnswers[currentIndex] === letter;
  });
}

function saveUserAnswer() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (selectedOption) {
    userAnswers[currentIndex] = selectedOption.value;
  } else {
    userAnswers[currentIndex] = null;
  }
}

document.getElementById("next-btn").addEventListener("click", () => {
  saveUserAnswer();
  if (currentIndex < questionsArr.length - 1) {
    currentIndex++;
    document.getElementById("question-number").textContent = currentIndex + 1;
    displayQuestion();
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  saveUserAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    document.getElementById("question-number").textContent = currentIndex + 1;
    displayQuestion();
  }
});

function checkAnswers() {
  let score = 0;

  for (let i = 0; i < questionsArr.length; i++) {
    const correct = questionsArr[i].correctAnswer;
    const userAnswer = userAnswers[i];
    if (userAnswer === correct) {
      score++;
    }
  }

  console.log(`Your score: ${score} out of ${questionsArr.length}`);
  alert(`Your score: ${score} out of ${questionsArr.length}`);
}

document.querySelector(".exam-submit-btn").addEventListener("click", () => {
  saveUserAnswer();
  checkAnswers();
});

getQuestionsData();
console.log(questionsArr);
console.log(userAnswers);
