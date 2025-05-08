import { auth, fdb } from "./auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// Here I am handle Login details and Signup authtication part dom onload
document.addEventListener("DOMContentLoaded", () => {
  const loginPage = document.getElementById("login-form");
  const signUp = document.getElementById("register-form");
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = "";
  //   Here signup part handle readirect login.html
  if (signUp) {
    let nameInput = document.querySelector("#signup-name");
    let emailInput = document.getElementById("signup-email");
    let passwordInput = document.getElementById("signup-password");
    let signUpBtn = document.getElementById("signUpBtn");
    signUpBtn.addEventListener("click", () => {
      let userName = nameInput.value.trim();
      let userEmail = emailInput.value.trim();
      let userPassword = passwordInput.value.trim();
      if (!userName || !userEmail || !userPassword) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "All fields are required";
        return;
      }
      // console.log(userName ,userEmail,userPassword)
      errorMessage.style.display = "none";
      signUpBtn.setAttribute("disabled", true);
      signUpBtn.innerText = "Loading...";

      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          await setDoc(doc(fdb, "users", user.uid), {
            uid: user.uid,
            name: userName,
            email: user.email,
            role: "user",
            profilePicture:
              "https://cdn-icons-png.flaticon.com/128/64/64572.png",
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            isEmailVerified: user.emailVerified,
            settings: {
              darkMode: false,
            },
            memoryStats: {
              totalMemories: 0,
              totalAlbums: 0,
            },
            collaborations: [],
            locationPreferences: {
              shareLocation: true,
            },
          });

          return updateProfile(user, {
            displayName: userName,
          });
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "login.html";
          }, 3000);
          alert("Sign up successfully! redirecting.....");
        })
        .catch((err) => {
          console.log(err);
          errorMessage.style.display = "block";
          errorMessage.innerText = err.message;
        })
        .finally(() => {
          signUpBtn.removeAttribute("disabled");
          signUpBtn.innerText = "Sign Up";
        });
    });
  }
  //   Here I am handle login page information user login after redrect dashboard.html
  if (loginPage) {
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", () => {
      let userEmail = emailInput.value.trim();
      let userPassword = passwordInput.value.trim();
      if (!userEmail || !userPassword) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "All fields are required";
        return;
      }
      console.log(userEmail, userPassword);
      errorMessage.style.display = "none";
      loginBtn.setAttribute("disabled", true);
      loginBtn.innerText = "Loading...";

      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          setTimeout(() => {
            window.location.href = "../dashboard/dashboard.html";
          }, 3000);
          alert(`Welcome ${user.displayName} Login Successfully! redirecting...`);
        })
        .catch((err) => {
          console.log(err);
          errorMessage.style.display = "block";
          errorMessage.innerText = err.message;
        })
        .finally(() => {
          loginBtn.removeAttribute("disabled");
          loginBtn.innerText = "Sign Up";
        });
    });
  }
  onAuthStateChanged(auth,(user)=>{
    if(user){
        window.location.href = '../dashboard/dashboard.html'
    }
  })
});
