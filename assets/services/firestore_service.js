import {
	db,
	doc,
	setDoc,
	collection,
	getDocs,
	addDoc,
	query,
	where
} from "../../firebase.js";

export const createUser = async (userData, role) => {
	try {
		const docRef = doc(db, "users", userData.uid);
		const data = await setDoc(docRef, {
			email: userData.email,
			displayName: userData.displayName,
			uid: userData.uid,
			role: role
		});
		return data;
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

export const createExamsResults = async (uid, subjectId, userScore) => {
	try {
		const collectionRef = collection(db, "exams-results");
		const data = await addDoc(collectionRef, {
			uid: uid,
			userScore: userScore,
			subjectId: subjectId
		});
		return data;
	} catch (error) {
		console.error("Error setting exam results");
	}
};

// const user = auth.currentUser;
// onAuthStateChanged(auth, (user) => {
// 	if (user) {
// 		console.log(user.uid);
// 		createExamsResults(user.uid, "WEB101",score);
// 	} else {
// 		console.log("No user signed in");
// 	}
// });

export const getAllExams = async () => {
	try {
		const examsRef = collection(db, "exams");
		const querySnapshot = await getDocs(examsRef);
		const exams = [];
		querySnapshot.forEach((doc) => {
			exams.push({
				id: doc.id,
				...doc.data()
			});
		});
		return exams;
	} catch (error) {
		console.log("error fetching", error);
		throw error;
	}
};

export const getQuestionsData = async (id) => {
	try {
		const qDocs = await getDocs(collection(db, "exams", id, "question"));
		const questions = [];
		qDocs.forEach((doc) => {
			questions.push({
				id: doc.id,
				...doc.data()
			});
		});
		return questions;
	} catch (error) {
		console.log("error fetching questions data", error);
	}
};

export const getExamsResultsData = async (uid) => {
	try {
		const q = query(collection(db, "exams-results"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		const examsResults = []
		querySnapshot.forEach((doc) => {
			examsResults.push({
				id: doc.id,
				...doc.data()
			});
		});
		return examsResults
	} catch (error) {
		console.log("Error getting exams result", error);
	}
};
