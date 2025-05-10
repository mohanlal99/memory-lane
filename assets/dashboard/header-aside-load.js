import { auth } from "../js/auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const aside = document.getElementById("sidebar");
  const footer = document.getElementById("footer");



  if (header || aside || footer) {
    let headerhtml = document.createElement("header");
    let asidehtml = document.createElement("aside");
    let footerhtml = document.createElement("footer");

    headerhtml.innerHTML = `
                <div class="logo">
                    <h2>Memory Lane</h2>
                    <p>Mohanlal</p>
                </div>
                <div style="display: none;" class="search">
                    <input type="text" placeholder="Search..." id="searchInput">
                </div>
                <nav>
                    <div class="nav-links" id="navLinks">
                        <div>
                            <button class="btn-xs" id="dark-mode"><abbr title="Dark Mode">☀️</abbr></button>
                            <span style="display: none;">🌙</span>
                        </div>
                        <div>
                            <span></span>
                            <button class="btn-xs" id="notification"><abbr title="Notification">🔔</abbr></button>
                        </div>
                        <div>
                            <span></span>
                            <button class="btn-xs" id="setting"><abbr title="Setting">⚙️</abbr></button>
                        </div>
                        <div>
                            <button class="btn-xs" id="reminimise"><abbr title="Random Memory Fetch">🕰️</abbr></button>
                        </div>
                        <div>
                            <button id="logoutBtn" class="btn btn-warning">
                                <span>Log out</span>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div>
                    </div>
                    <button class=' btn-xs' id="toggleSidebarBtn">☰</button>
                </nav>
    `;

    asidehtml.classList.add("sidebar");
    asidehtml.innerHTML = `
                        <div class="topbox">
                            <div class="nav-items">
                                <div class="item"><a href="dashboard.html">🏠 Dashboard</a></div>
                                <div class="item"><a href="all-memories.html">🖼️ All Memories</a></div>
                                <div class="item"><a href="create-memory.html">📝 Add Memory</a></div>
                                <div class="item"><a href="create-album.html">📂 Albums</a></div>
                                <div class="item"><a href="memory-map.html">🗺️ Memory Map</a></div>
                                <div class="item"><a href="ai-memory-video.html">🎥 AI Memory Video</a></div>
                                <div class="item"><a href="collaborative-albums.html">👥 Collaborative Albums</a></div>
                            </div>
                        </div>
                        <div class="bottom-box">
                            <div class="nav-items">
                                <div class="item"><a href="profile.html">👤 Profile</a></div>
                                <div class="item"><a href="settings.html">⚙️ Settings</a></div>
                                <div id="logoutsidebar">
                                    <button id="logoutBtn" class="btn btn-warning ">
                                        <span>Log out</span>
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                     `;

    // Footer content
    footerhtml.classList.add("footer");
    footerhtml.innerHTML = `
      <p>Created by <strong>Mohanlal</strong> &copy; ${new Date().getFullYear()}</p>
    `;

    header.appendChild(headerhtml);
    aside.appendChild(asidehtml);
    footer.appendChild(footerhtml);

    // Add event listeners for logout
    document.getElementById("logoutsidebar").addEventListener("click", logout);
    document.getElementById("logoutBtn").addEventListener("click", logout);

    function logout() {
      signOut(auth)
        .then(() => {
          window.location.href = "../../templates/login.html";
          alert("Sign out successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const darkModeBtn = document.getElementById("dark-mode");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        darkModeBtn.innerHTML = "🌙"; // Sun icon for dark mode (you can change it to something else)
      } else {
        document.body.classList.remove("dark");
        darkModeBtn.innerHTML = "🌞"; // Moon icon for light mode
      }


    // Add sidebar toggle functionality
    let flg = true
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");

    toggleSidebarBtn.addEventListener("click", () => {
        flg = !flg
      document.querySelector("aside.sidebar").classList.toggle("active");
      if (flg) {
          toggleSidebarBtn.innerHTML = "☰"; 
        } else {
            toggleSidebarBtn.innerHTML = "❌"; 
        }
    });


    darkModeBtn.addEventListener("click", () => {
        // Toggle dark mode class on body
        document.body.classList.toggle("dark");
  
        // Update localStorage with the new preference
        if (document.body.classList.contains("dark")) {
          localStorage.setItem("darkMode", "enabled");
          darkModeBtn.innerHTML = "🌙"; // Sun icon for dark mode
        } else {
          localStorage.setItem("darkMode", "disabled");
          darkModeBtn.innerHTML = "🌞"; // Moon icon for light mode
        }
      });
  }
});
