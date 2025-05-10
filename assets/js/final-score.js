const score = Number(localStorage.getItem("examScore"));
document.getElementById("score-text").textContent = `${score}%`;

if (score == 100) {
  document
    .getElementById("score-img")
    .setAttribute("src", "../assets/imgs/4.png");

  document.getElementById("score-p").textContent =
    "Excellent! You got a perfect score! 🎉";
}

if (score >= 70 && score < 100) {
  document
    .getElementById("score-img")
    .setAttribute("src", "../assets/imgs/3.png");
  document.getElementById("score-p").textContent =
    "Great job! You did very well! ";
}
if (score < 70) {
  document
    .getElementById("score-img")
    .setAttribute("src", "../assets/imgs/2.png");
  document.getElementById("score-p").textContent =
    "Keep trying! You can do better next time.";
}
