import { auth, fdb } from "../js/auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("memory-lane-user", JSON.stringify(user));
      //   console.log(user);
    } else {
      window.location.href = "../../templates/login.html";
    }
  });
});

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("memory-lane-user"));
}
