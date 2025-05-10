import { getUserDetails } from "../../assets/dashboard/getUserDetails.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user1 = await getUserDetails();
  const user2 = getCurrentUser();

  const userProfileContainer = document.getElementById("user-profile");
  const userProfileHtml = `
        <div class="profile-container">
            <div class="profile-header">
                <div>
                    <h1 class="name">${user1.displayName || "User Name"}</h1>
                    <span class="email">${user1.email}</span>
                </div>
            </div>
            <div class="profile-info">
                <span>Created At:</span> ${user1.createdAt}<br>
                <span>Last Login:</span> ${
                  user1.lastLoginAt
                }<br>
                <span>Email Verified:</span> ${
                  user1.emailVerified ? "Yes" : "No"
                }<br>
            </div>
        </div>
    `;
    userProfileContainer.innerHTML = userProfileHtml;

  const userProfileContainer2 = document.getElementById("user-profile-2");
  const userProfileHtml2 = `
                <div class="profile-container">
                    <div class="profile-header">
                        <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="Profile Picture">
                        <div>
                            <h1 class="name">${
                              user2.displayName || "User Name"
                            }</h1>
                            <span class="email">${user2.email}</span>
                        </div>
                    </div>
                    <div class="profile-info">
                        <span>Created At:</span> ${formatTimestamp(
                          user2.createdAt
                        )}<br>
                        <span>Last Login:</span> ${formatTimestamp(
                          user2.lastLoginAt
                        )}<br>
                        <span>Email Verified:</span> ${
                          user2.emailVerified ? "Yes" : "No"
                        }<br>
                    </div>
                </div>
            `;
  userProfileContainer2.innerHTML = userProfileHtml2;
});
