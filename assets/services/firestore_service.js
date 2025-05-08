import { db, doc, setDoc, collection, getDocs } from "../../firebase.js";

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
    return exams
	} catch (error) {
		console.log("error fetching", error);
		throw error;
	}
};
