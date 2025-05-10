import { getCurrentUser } from "./getUser.js";
import { getUserDetails } from "./getUserDetails.js";

document.addEventListener("DOMContentLoaded", async () => {
  let user = getCurrentUser();
  let userData = await getUserDetails()
  console.log(userData)
  if (user) {
    console.log(user);
    const userName = document.getElementById("user-name");
    userName.innerText = "";
    userName.innerText = `${user.email.split("@")[0]}!`;
  }
});
