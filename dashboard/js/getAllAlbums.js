import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import { fdb } from "../../assets/js/auth.js";
import {
  doc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// export function getQueryParam(param) {
//   const urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get(param);
// }

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
      const memory = album.memoryIds;
      const albumCard = document.createElement("div");
      albumCard.classList.add("album-card");
      let flag = memory.length > 0;
      const imageSrc = flag
        ? "../images/fill-folder.png"
        : "../images/folder.png";
    //   console.log(flag ? "es" : "no");
      albumCard.innerHTML = `
          <div class="album-icon">
              <img src="${imageSrc}" alt="album-icon">
          </div>
          <div class="album-title">${album.title}</div>
          <p class="album-description">${album.description}</p>
          `;
      //   <button class="add-memories btn">➕ Add memories</button>

      albumsContainer.appendChild(albumCard);
      albumCard.addEventListener("click", () => [
        (window.location.href = `/dashboard/album-by-id.html?key=${albumId}`),
      ]);
    });
  } catch (error) {
    console.log(error);
    alert("Something went wrong while fetching albums.");
  }
}



getAlbums();
