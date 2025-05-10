import { db, collection, getDocs } from "../../firebase.js";
import { Question } from "./question-class.js";
let questionsArr = [];
let userAnswers = [];
let currentIndex = 0;

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function getQuestionsData() {
  const urlExamId = new URLSearchParams(window.location.search);
  console.log(urlExamId);
  const examId = urlExamId.get("id");
  console.log(examId);
  const qDocs = await getDocs(collection(db, "exams", examId, "question"));

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

export function displayQuestion() {
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

export function checkAnswers() {
  let score = 0;

  for (let i = 0; i < questionsArr.length; i++) {
    const correct = questionsArr[i].correctAnswer;
    const userAnswer = userAnswers[i];
    if (userAnswer === correct) {
      score++;
    }
  }
  let percent = Math.round((score / questionsArr.length) * 100);
  // return percent;
  localStorage.setItem("examScore", percent);
}

document.querySelector(".exam-submit-btn").addEventListener("click", () => {
  saveUserAnswer();
  checkAnswers();
  location.href = "/pages/final-score.html";
});

getQuestionsData();
console.log(questionsArr);
console.log(userAnswers);
