import { getCurrentUser } from "./getUser.js";
import { getUserDetails } from "./getUserDetails.js";

document.addEventListener("DOMContentLoaded", async () => {
  let user = getCurrentUser();
  console.log(user)
  const userDetails = await getUserDetails(); 
  if (user) {
    console.log(user);
    const userName = document.getElementById("user-name");
    userName.innerText = "";
    userName.innerText = `${user.email.split("@")[0]}!`;
  }
  if (userDetails) {
    document.getElementById("user-name").innerText = userDetails.name || 'User';
    document.getElementById("memories-count").innerText = userDetails.memoryStats?.totalMemories || '0';
    document.getElementById("album-count").innerText = userDetails.memoryStats?.totalAlbums || '0';
    document.getElementById("mile-count").innerText = userDetails.memoryStats?.totalMilestones || '0';
    document.getElementById("voice-count").innerText = userDetails.memoryStats?.totalVoiceNotes || '0';

    //  the user profile picture update
    const profilePicture = document.createElement('img');
    profilePicture.src = userDetails.profilePicture || 'https://cdn-icons-png.flaticon.com/128/64/64572.png';
    profilePicture.alt = userDetails.name || 'Profile Picture';
    profilePicture.classList.add('profile-picture'); 
    document.querySelector('.profile-picture-container').appendChild(profilePicture);

    if (userDetails.collaborations && userDetails.collaborations.length > 0) {
        const collaborationsContainer = document.getElementById("collaboration-album");
        userDetails.collaborations.forEach(collab => {
            const collabDiv = document.createElement('div');
            collabDiv.innerHTML = `
                <p>Album: ${collab.albumName} - Shared with ${collab.sharedWith}</p>
            `;
            collaborationsContainer.appendChild(collabDiv);
        });
    }
}
});
