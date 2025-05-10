import { fdb } from "../../assets/js/auth.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  getDocs,
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

  const albumBtn = document.getElementById("memory-album-Btn");
  const albumList = document.getElementById("memory-album-List");
  const memoryIdsInput = document.getElementById("memoryIdsInput");

  // Toggle album
  albumBtn.addEventListener("click", () => {
    albumList.style.display =
      albumList.style.display === "block" ? "none" : "block";
  });

  // Close album if clicked outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".memory-selector")) {
      albumList.style.display = "none";
    }
  });

  // Update hidden input on selection
  albumList.addEventListener("change", () => {
    const checkedBoxes = albumList.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const selectedIds = Array.from(checkedBoxes).map((cb) => cb.value);
    memoryIdsInput.value = JSON.stringify(selectedIds);
    albumBtn.textContent =
      selectedIds.length > 0
        ? `${selectedIds.length} selected ⬇️`
        : "Select Memories ⬇️";
  });

  populateMemoriesalbum();

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
        const ids = JSON.parse(data.memoryId);
        if (Array.isArray(ids)) {
          mem.push(...ids);
        } else {
          mem.push(ids); // in case it’s a single ID, not array
        }
      }
      // console.log(data);

      if (!data.title || !data.description) {
        alert("Enter title and description");
        return;
      }
      console.log(mem);
      console.log(data);

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

async function populateMemoriesalbum() {
  const user = getCurrentUser();
  const albumList = document.getElementById("memory-album-List");

  albumList.innerHTML = "Loading...";

  try {
    const userCollectionMemories = collection(
      fdb,
      "users",
      user.uid,
      "memories"
    );
    const querySnapshot = await getDocs(userCollectionMemories);

    if (querySnapshot.empty) {
      albumList.innerHTML = "<p style='padding:10px'>No memories found</p>";
      return;
    }

    albumList.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const memory = docSnap.data();
      const memoryId = docSnap.id;
      const label = document.createElement("label");
      label.id = memoryId;
      label.innerHTML = `
      <input id="${memoryId}" style="width: 20px;" type="checkbox" value="${memoryId}">
        <span>  ${memory.title || "Untitled Memory"} </span>
      `;
      albumList.appendChild(label);
    });
  } catch (error) {
    albumList.innerHTML = "<p style='padding:10px'>Error loading memories</p>";
    console.error(error);
  }
}
