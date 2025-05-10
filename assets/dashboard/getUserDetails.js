import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "./getUser.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function getUserDetails() {
  const user = getCurrentUser();

  if (!user) {
    console.log("No user is currently logged in.");
    return null;
  }
  try {
    const userDocRef = doc(fdb, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("User document not found.");
      return null;
    }
  } catch (error) {
    console.log("Error fetching user details:", error);
    return null;
  }
}
