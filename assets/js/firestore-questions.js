import {
  getQuestionsData,
  createExamsResults,
} from "../services/firestore_service.js";
import { Question } from "./question-class.js";

let questionsArr = [];
let userAnswers = [];
let currentIndex = 0;
const flaggedQuestionsArr = [];
const params = new URLSearchParams(document.location.search);
const subjectId = params.get("id");
const subjectTitle = params.get("title");
const duration = params.get("duration");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function handleQuestionsData() {
  const questions = await getQuestionsData(subjectId);
  questions.forEach((question) => {
    const answersObj = question.options;
    const answersArr = Object.entries(answersObj);
    // create the instance
    const questionObj = new Question(
      question.id,
      question.questionText,
      answersArr,
      question.correctAnswer
    );
    questionsArr.push(questionObj);
  });

  shuffle(questionsArr);
  displayQuestion();
}

function displayQuestion(curr = 0) {
  currentIndex = curr;

  const Q = questionsArr[curr];
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

  //display the question number and update the currentIndex to match it
  document.getElementById("question-number").textContent = `${curr + 1} of ${
    questionsArr.length
  }`;
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
    ++currentIndex;
    displayQuestion(currentIndex);
    updateFlagIcon();
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  saveUserAnswer();
  if (currentIndex > 0) {
    --currentIndex;
    displayQuestion(currentIndex);
    updateFlagIcon();
  }
});

export async function checkAnswers() {
  let score = 0;

  for (let i = 0; i < questionsArr.length; i++) {
    const correct = questionsArr[i].correctAnswer;
    const userAnswer = userAnswers[i];
    if (userAnswer === correct) {
      score++;
    }
  }
  let percent = Math.round((score / questionsArr.length) * 100);
  const uid = localStorage.getItem("uid");
  const userName = localStorage.getItem("userName");
  console.log(uid, userName);
  // return percent;
  localStorage.setItem("examScore", percent);
  try {
    await createExamsResults(uid, userName, subjectId, subjectTitle, percent);
  } catch (err) {
    console.log(err);
  }
  window.location.replace("/pages/final-score.html");
}

document
  .querySelector(".exam-submit-btn")
  .addEventListener("click", async () => {
    saveUserAnswer();
    await checkAnswers();
  });

handleQuestionsData();
console.log(questionsArr);
console.log(userAnswers);

//flag-btn
document.getElementById("flag-btn").addEventListener("click", () => {
  const questionNumber = currentIndex + 1;
  const flagIcon = document.querySelector(".bi.bi-flag, .bi.bi-flag-fill");
  const flaggedQuestionsListEle = document.querySelector(
    ".flagged-questions-list"
  );

  if (flaggedQuestionsArr.includes(currentIndex)) {
    //unflag
    flaggedQuestionsArr.splice(flaggedQuestionsArr.indexOf(currentIndex), 1);
    flagIcon.classList.replace("bi-flag-fill", "bi-flag");

    const itemToRemove = Array.from(flaggedQuestionsListEle.children).find(
      (item) => item.textContent === `Question ${questionNumber}`
    );

    if (itemToRemove) itemToRemove.remove();
  } else {
    //flag
    flaggedQuestionsArr.push(currentIndex);
    flagIcon.classList.replace("bi-flag", "bi-flag-fill");

    //add flag to the list ui
    const flaggedItem = document.createElement("li");
    const questionBtn = document.createElement("button");
    questionBtn.textContent = `Question ${questionNumber}`;
    flaggedItem.classList.add("border-bottom", "pb-2", "fw-medium");
    flaggedItem.appendChild(questionBtn);
    flaggedQuestionsListEle.appendChild(flaggedItem);

    questionBtn.addEventListener("click", () => {
      handleflaggedQuestionNav(questionNumber - 1);
    });
  }
});

function handleflaggedQuestionNav(curr) {
  saveUserAnswer();
  displayQuestion(curr);
  updateFlagIcon();
}

//check wether question icon is filled or not on every action(next,prev,flaggedQuestions)
function updateFlagIcon() {
  const flagIcon = document.querySelector(".bi.bi-flag, .bi.bi-flag-fill");
  if (flaggedQuestionsArr.includes(currentIndex)) {
    flagIcon.classList.replace("bi-flag", "bi-flag-fill");
  } else {
    flagIcon.classList.replace("bi-flag-fill", "bi-flag");
  }
}
