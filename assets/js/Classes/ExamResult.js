export default class ExamResult {
    constructor(
        id,
        uid,
        userScore,
        subjectId,
        subjectTitle,
        userName,
        createdAt
    ) {
        this.id = id;
        this.uid = uid;
        this.userName = userName;
        this.createdAt = createdAt;
        this.userScore = userScore;
        this.subjectId = subjectId;
        this.subjectTitle = subjectTitle;
    }
}