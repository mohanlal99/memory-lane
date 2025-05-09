import { fdb } from "../js/auth.js";
import { getCurrentUser } from "./getUser.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  increment,
  collection,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  //   const userCollection = doc(fdb , "users" , user.uid)
  if (!user) {
    window.location.href = "../../templates/login.html";
  }
  const loader = document.getElementById("loader");
  const createMemoryForm = document.getElementById("createMemoryForm");
  const submitBtn = document.getElementById("createMemorySubmitBtn");

  //   userCollectionMemorise()
  //   Create Memory and store in firebase
  createMemoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log("is working");
    loader.style.display = "grid";
    let memoryData = new FormData(createMemoryForm);
    let newMemory = {};
    memoryData.forEach((item, index) => {
      newMemory[index] = item;
    });
    // console.log(newMemory);
    // let userCollectionMemorise = await collection(fdb, "users", user.id);
    // This is inner collection create and store in memory
    try {
      let userCollectionMemorise = collection(
        fdb,
        "users",
        user.uid,
        "memories"
      );
      //   const { title, description, address, photoUrl } = newMemory;
      const title = newMemory.title || "untitled";
      const description = newMemory.description || "";
      const privacy = newMemory.privacy || "Private";
      const tags = newMemory.tags || "";
      const photoUrl = newMemory.photoUrl || "";
      const location = newMemory.location || "";
      const address = newMemory.address || "";
      if (address === "") {
        alert("please click on map");
        return;
      }
      // console.log(newMemory)
      // console.log(location)
      let memoryDoc = await addDoc(userCollectionMemorise, {
        userId: user.uid,
        title,
        description,
        photos: photoUrl,
        //   videos: [],
        //   voiceNotes: [],
        tags: tags,
        privacy,
        location: {
          code: location,
          address,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isMilestone: false,
      });
      await updateDoc(doc(fdb, "users", user.uid), {
        "memoryStats.totalMemories": increment(1),
        "memoryStats.totalAlbums": increment(1),
      });
      // console.log(memoryDoc.id);
      alert("Memory added successfully!");
      window.location.href = "all-memories.html"
      
    } catch (error) {
      console.log(error);
      alert("Something wen't wrong!");
    } finally {
      loader.style.display = "none";
    }
  });
});
