import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import { fdb } from "../../assets/js/auth.js";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function getAlbums() {
  try {
    const user = getCurrentUser();
    let albumsCollection = collection(fdb, "users", user.uid, "albums");
    let querySnapshot = await getDocs(albumsCollection);

    const albumsContainer = document.getElementById("all-albums");
    albumsContainer.innerHTML = "";

    if (querySnapshot.empty) {
      albumsContainer.innerHTML = "<p>No albums found.</p>";
      return;
    }

    querySnapshot.forEach((docSnap) => {
      const album = docSnap.data();
      const albumId = docSnap.id;
      const memory = album.memoryIds || [];
      const albumCard = document.createElement("div");
      albumCard.classList.add("album-card");

      const imageSrc =
        memory.length > 0 ? "../images/fill-folder.png" : "../images/folder.png";

      albumCard.innerHTML = `
          <div class="album-icon">
              <img src="${imageSrc}" alt="album-icon">
          </div>
          <div class="album-title">${album.title}</div>
          <p class="album-description">${album.description}</p>
          <div class="album-actions">
              <button class="btn view-btn">👁 View</button>
              <button class="btn edit-btn">✏️ Edit</button>
              <button class="btn delete-btn">🗑 Delete</button>
          </div>
      `;

      albumsContainer.appendChild(albumCard);

      // View Album
      albumCard.querySelector(".view-btn").addEventListener("click", () => {
        window.location.href = `/dashboard/album-by-id.html?key=${albumId}`;
      });

      // Edit Album
      albumCard.querySelector(".edit-btn").addEventListener("click", () => {
        alert("Edit feature coming soon..."); // you can open edit modal here
      });

      // Delete Album
      albumCard.querySelector(".delete-btn").addEventListener("click", async () => {
        if (confirm(`Delete album "${album.title}"?`)) {
          await deleteDoc(doc(fdb, "users", user.uid, "albums", albumId));
          alert("Album deleted!");
          getAlbums();
        }
      });
    });
  } catch (error) {
    console.log(error);
    alert("Something went wrong while fetching albums.");
  }
}

getAlbums();
