import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "./getUser.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  getDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export  async function getUserDetails() {
  const user = getCurrentUser();
  try {
    const data = await getDoc(doc(fdb, "users", user.uid));
    console.log(data);
    return data 
  } catch (error) {
    console.log(error);
  }
}

// getCurrentUser();
