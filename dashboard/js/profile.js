import { getUserDetails } from "../../assets/dashboard/getUserDetails.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";

function formatTimestamp(ts) {
  if (!ts) return "N/A";
  if (typeof ts.toDate === "function") {
    return ts.toDate().toLocaleString();
  }
  if (typeof ts === "number") {
    return new Date(ts).toLocaleString();
  }
  return ts;
}

document.addEventListener("DOMContentLoaded", async () => {
  const firestoreUser = await getUserDetails();  // from Firestore
  const authUser = getCurrentUser();             // from Firebase Auth

  console.log("Firestore user:", firestoreUser);
  console.log("Auth user:", authUser);

  const userProfileContainer = document.getElementById("user-profile");

  const userProfileHtml = `
    <div class="profile-container">
      <div class="profile-header">
        <img src="${firestoreUser.profilePicture || authUser.photoURL || "https://cdn-icons-png.flaticon.com/128/64/64572.png"}" 
             alt="Profile Picture">
        <div>
          <h1 class="name">${firestoreUser.name || authUser.displayName || "User Name"}</h1>
          <span class="email">${authUser.email || firestoreUser.email || "No Email"}</span>
          <p class="role">Role: ${firestoreUser.role || "N/A"}</p>
        </div>
      </div>
      <div class="profile-info">
        <span>Created At:</span> ${formatTimestamp(firestoreUser.createdAt || authUser.createdAt)}<br>
        <span>Last Login:</span> ${formatTimestamp(firestoreUser.lastLogin || authUser.lastLoginAt)}<br>
        <span>Email Verified:</span> ${(authUser.emailVerified || firestoreUser.isEmailVerified) ? "Yes" : "No"}<br>
        <span>Total Albums:</span> ${firestoreUser.memoryStats?.totalAlbums || 0}<br>
        <span>Total Memories:</span> ${firestoreUser.memoryStats?.totalMemories || 0}<br>
      </div>
    </div>
  `;

  userProfileContainer.innerHTML = userProfileHtml;
});
