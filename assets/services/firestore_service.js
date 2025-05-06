import { db, doc, setDoc } from "../../firebase.js";

export const createUser = async (userData, role) => {
  try {
    const docRef = doc(db, "users", userData.uid);
    const data = await setDoc(docRef, {
      email: userData.email,
      displayName: userData.displayName,
      uid: userData.uid,
      role: role,
    });
    return data;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
