import { fdb } from "../../assets/js/auth.js";
import {
  doc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = getCurrentUser();
  const memoriesCards = document.getElementById("memories-cards");
  try {
    //   let data = await getDocs(doc(fdb, "users", user.uid));
    //   console.log(data)
    // let collectionUser = collection(fdb, "users", user.uid , "memories")
    let userCollectionMemorise = collection(fdb, "users", user.uid, "memories");
    const querySnapshot = await getDocs(userCollectionMemorise);

    if (querySnapshot.length == 0) {
      let h3 = document.createElement("h3");
      h3.innerText = "No memories";
      memoriesCards.append(h3);
      return;
    }

    const path = window.location.href;
    let documentsToDisplay = querySnapshot.docs; // Default to showing all documents

    if (path.includes("dashboard.html")) {
      // Slice the first 2 documents if on the dashboard page
      documentsToDisplay = querySnapshot.docs.slice(0, 2);
    }
  memoriesCards.innerHTML = "";

    documentsToDisplay.forEach((doc) => {
      const memory = doc.data();

      const card = document.createElement("div");
      card.classList.add("card");
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

      memoriesCards.appendChild(card);
    });
  } catch (error) {
    alert("Something wen't wrong");
  }
});
