import { getCurrentUser } from "./getUser.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "../../templates/login.html";
  }
  const loader = document.getElementById('loader');
  const createMemoryForm = document.getElementById("createMemoryForm")
  const submitBtn = document.getElementById("createMemorySubmitBtn")

//   Create Memory and store in firebase

  












});
