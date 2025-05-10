import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { apiKey } from "../../.key.js";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "memory-lane-5884f.firebaseapp.com",
  projectId: "memory-lane-5884f",
  storageBucket: "memory-lane-5884f.firebasestorage.app",
  messagingSenderId: "1074492840585",
  appId: "1:1074492840585:web:7cd4e6dd5e5fb8e2d00458",
  measurementId: "G-9H1WHGQ36B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fdb = getFirestore(app);
