export class Question {
  constructor(id, text, answers, correctAnswer) {
    (this.id = id),
      (this.text = text),
      (this.answers = answers),
      (this.correctAnswer = correctAnswer);
  }
}
