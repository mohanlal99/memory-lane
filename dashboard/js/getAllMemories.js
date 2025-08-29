import { fdb } from "../../assets/js/auth.js";
import {
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";

let allMemories = []; // cache all fetched memories
let filteredMemories = []; // store filtered results

document.addEventListener("DOMContentLoaded", async () => {
  const user = getCurrentUser();
  const memoriesCards = document.getElementById("memories-cards");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort");

  try {
    let userCollectionMemories = collection(fdb, "users", user.uid, "memories");
    const querySnapshot = await getDocs(userCollectionMemories);

    if (querySnapshot.empty) {
      memoriesCards.innerHTML = "<h3>No memories</h3>";
      return;
    }

    allMemories = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    filteredMemories = [...allMemories];
    renderMemories(filteredMemories);

    /** 🔍 Debounced search */
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        filteredMemories = allMemories.filter((m) => {
          return (
            m.title?.toLowerCase().includes(query) ||
            m.description?.toLowerCase().includes(query) ||
            m.tags?.toLowerCase().includes(query) ||
            m.location?.address?.toLowerCase().includes(query)
          );
        });
        applySort(); // always apply current sort
      }, 1000); // 1000ms debounce
    });

    /** 🔽 Sorting */
    sortSelect.addEventListener("change", () => {
      applySort();
    });

    function applySort() {
      const sortValue = sortSelect.value;

      if (sortValue === "newest") {
        filteredMemories.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      } else if (sortValue === "oldest") {
        filteredMemories.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      } else if (sortValue.startsWith("privacy")) {
        const target = sortValue.split("-")[1]; // public/private/custom
        filteredMemories = allMemories.filter(
          (m) => m.privacy?.toLowerCase() === target
        );
      } else if (sortValue === "location") {
        filteredMemories.sort((a, b) =>
          (a.location?.address || "").localeCompare(b.location?.address || "")
        );
      }

      renderMemories(filteredMemories);
    }

    /** 🖼 Render Function */
    function renderMemories(memories) {
      memoriesCards.innerHTML = "";
      if (memories.length === 0) {
        memoriesCards.innerHTML = "<h3>No memories found</h3>";
        return;
      }

      memories.forEach((memory) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", memory.id);

        card.innerHTML = `
          <h3>${memory.title || "Untitled"}</h3>
          <small>Created on: ${
            memory.createdAt
              ? new Date(memory.createdAt.seconds * 1000).toLocaleDateString()
              : "Unknown"
          }</small>

          <p class="small-text"><strong>Description:</strong> ${memory.description || ""}</p>
          <p class="tags"><strong>Tags:</strong> ${memory.tags || ""}</p>

          <img src="${memory.photos?.split(",")[0] || "../../images/noimg.jpeg"}" alt="Memory photo">

          <p class="small-text">
            <strong>Location:</strong> 
            <abbr title="${memory.location?.address || ""}">${memory.location?.address || "Unknown location"}</abbr>
          </p>

          <p><strong>Privacy:</strong> ${memory.privacy || "Private"}</p>

          <button class="btn btn-warning btn-delete">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        `;

        // 🗑️ Delete handler
        card.querySelector(".btn-delete").addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this memory?")) {
            try {
              await deleteDoc(doc(fdb, "users", user.uid, "memories", memory.id));
              card.remove();
              allMemories = allMemories.filter((m) => m.id !== memory.id);
              filteredMemories = filteredMemories.filter((m) => m.id !== memory.id);
              alert("Memory deleted successfully!");
            } catch (error) {
              console.error("Error deleting memory:", error);
              alert("Failed to delete memory.");
            }
          }
        });

        memoriesCards.appendChild(card);
      });
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while fetching memories.");
  }
});

// Reusable getter
export async function getAllMermories() {
  const user = getCurrentUser();
  const userCollectionMemories = collection(fdb, "users", user.uid, "memories");
  const querySnapshot = await getDocs(userCollectionMemories);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
