import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  async function getAlbumById() {
    try {
      const memoriesContainer = document.getElementById("memories-cards");
      const allMermories = document.querySelector("#all-mermories");

      memoriesContainer.innerHTML = "";
      const albumId = getQueryParam("key");

      const user = getCurrentUser();
      const albumDocRef = doc(fdb, "users", user.uid, "albums", albumId);
      const albumSnap = await getDoc(albumDocRef);

      if (!albumSnap.exists()) {
        alert("Album not found");
        return;
      }

      const albumData = { id: albumSnap.id, ...albumSnap.data() };
      const albumNameEl = document.getElementById("albumName");
      albumNameEl.innerHTML = `${albumData.title} <p>${albumData.description}</p>`;

      const memoryIds = albumData.memoryIds || [];
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

      if (memories.length === 0) {
        allMermories.style.display = "none";
      }

      memories.forEach((memory) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h3>${memory.title || "Untitled"}</h3>
          <small>Created on: ${
            memory.createdAt
              ? new Date(memory.createdAt.seconds * 1000).toLocaleDateString()
              : "Unknown"
          }</small>
          <p><strong>Description:</strong> ${memory.description || ""}</p>
          <p><strong>Tags:</strong> ${memory.tags || ""}</p>
          <img src="${
            memory.photos?.split(",")[0] || "../../images/noimg.jpeg"
          }" alt="Memory photo">
          <p><strong>Location:</strong> ${
            memory.location?.address || "Unknown location"
          }</p>
          <p><strong>Privacy:</strong> ${memory.privacy || "Private"}</p>
        `;

        memoriesContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching album by ID:", error);
      alert(error.message || "Something went wrong while fetching album.");
    }
  }

  getAlbumById();

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
});
