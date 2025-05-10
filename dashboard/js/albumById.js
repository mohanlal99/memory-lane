import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import {
  doc,
  getDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", () => {
  async function getAlbumById() {
    try {
      const memoriesContainer = document.getElementById("memories-cards");
      memoriesContainer.innerHTML = "";
      const albumId = getQueryParam("key");

      const user = getCurrentUser();
      const albumDocRef = doc(fdb, "users", user.uid, "albums", albumId);
      const albumSnap = await getDoc(albumDocRef);

      //   console.log(albumSnap);

      const albumData = { id: albumSnap.id, ...albumSnap.data() };
      const albumNameEl = document.getElementById("albumName");
      albumNameEl.innerHTML = `${albumData.title} <p>${albumData.description}</p>`;

      const memoryIds = albumData.memoryIds || []; // Ensure memoryIds exist
      const memories = [];

      for (const memoryId of memoryIds) {
        const memoryDocRef = doc(fdb, "users", user.uid, "memories", memoryId);
        const memorySnap = await getDoc(memoryDocRef);

        if (memorySnap.exists()) {
          memories.push({ id: memorySnap.id, ...memorySnap.data() });
        } else {
          console.warn(`Memory with ID ${memoryId} not found.`);
        }
      }

      // Here you can do something with the fetched memories, for example, render them
      console.log(memories);
      memories.forEach((memory) => {
        const card = document.createElement("div");
        card.classList.add("card"); // optional class if you want to style cards

        card.innerHTML = `
          <h3>${memory.title || "Untitled"}</h3>
          <small>Created on: ${
            memory.createdAt
              ? new Date(memory.createdAt.seconds * 1000).toLocaleDateString()
              : "Unknown"
          }</small>
    
          <p class="small-text">
            <strong>Description:</strong> ${memory.description || ""}
          </p>
          <p class="tags"><strong>Tags:</strong> ${memory.tags || ""}</p>
    
          <img src="${
            memory.photos?.split(",")[0] || "../../images/noimg.jpeg"
          }" alt="Memory photo">
    
          <p class="small-text">
            <strong>Location:</strong> 
            <abbr title="${memory.location?.address || ""}">${
          memory.location?.address || "Unknown location"
        }</abbr>
          </p>
    
          <p><strong>Privacy:</strong> ${memory.privacy || "Private"}</p>
        `;

        memoriesContainer.appendChild(card);
      });

      //   console.log(albumData)
    } catch (error) {
      console.error("Error fetching album by ID:", error);
      alert(error.message || "Something went wrong while fetching album.");
      return null;
    }
  }
  getAlbumById();
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
