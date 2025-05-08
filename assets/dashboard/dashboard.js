import { getCurrentUser } from "./getUser.js";

document.addEventListener("DOMContentLoaded", () => {
  let user = getCurrentUser();
  if (user) {
    console.log(user);
    const userName = document.getElementById("user-name");
    userName.innerText = "";
    userName.innerText = `${user.email.split("@")[0]}!`;
  }
});
