import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAlbums } from "./getAllAlbums.js";
document.addEventListener("DOMContentLoaded", () => {
  let user = getCurrentUser();
  const createAlbumModal = document.getElementById("create-albums");
  const createAlbumBtn = document.querySelector("#createAlbumBtn");
  const closeBtn = document.getElementById("close");
  function toggleCreateAlbum() {
    createAlbumModal.classList.toggle("active");
  }

  createAlbumBtn.addEventListener("click", toggleCreateAlbum);
  closeBtn.addEventListener("click", toggleCreateAlbum);

  const createAlbumForm = document.getElementById("createAlbumForm");
  createAlbumForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      createAlbumBtn.innerText = "Loading...";
      const formData = new FormData(createAlbumForm);
      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        memoryId: formData.get("memoryIds"),
      };
      const mem = [];
      if (data.memoryId) {
        mem.push(data.memoryId);
      }
      // console.log(data);

      if (!data.title || !data.description) {
        alert("Enter title and description");
        return;
      }

      const userCollection = collection(fdb, "users", user.uid, "albums");
      await addDoc(userCollection, {
        userId: user.uid,
        title: data.title || null,
        description: data.description || null,
        memoryIds: mem,
        collaborators: [],
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(fdb, "users", user.uid), {
        "memoryStats.totalAlbums": increment(1),
      });

      toggleCreateAlbum();
      getAlbums();
      document.getElementById("album-title").value = "";
      document.getElementById("album-des").value = "";
      alert("Album is created Suceessfully!");
    } catch (error) {
      console.log(error);
      alert("Something wen't wrong");
    } finally {
      createAlbumBtn.innerHTML = "Create Album";
    }
  });
});
