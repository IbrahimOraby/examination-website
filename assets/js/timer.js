import { checkAnswers } from "./firestore-questions.js";

var countDownDate = new Date().getTime() + 1 * 60 * 1000;

function formatTime(unit) {
  return unit < 10 ? "0" + unit : unit;
}

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance <= 5 * 60000) {
    document.getElementById("timer").style.color = "red";
  } else {
    document.getElementById("timer").style.color = "black";
  }

  document.getElementById("timer").innerHTML =
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    checkAnswers();
  }
}, 1000);
