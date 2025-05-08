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
                </nav>
    `;
    asidehtml.classList.add("sidebar");
    asidehtml.innerHTML = `
                        <div class="topbox">
                            <div class="nav-items">
                                <div class="item"><a href="dashboard.html">🏠 Dashboard</a></div>
                                <div class="item"><a href="create-memory.html">📝 Add Memory</a></div>
                                <div class="item"><a href="create-album.html">📂 Albums</a></div>
                                <!-- <div class="item"><a href="#">🗓️ Memories Timeline</a></div> -->
                                <div class="item"><a href="memory-map.html">🗺️ Memory Map</a></div>
                                <div class="item"><a href="ai-memory-video.html">🎥 AI Memory Video</a></div>
                                <div class="item"><a href="collaborative-albums.html">👥 Collaborative Albums</a></div>
                            </div>
                        </div>
                        <div class="bottom-box">
                            <div class="nav-items">
                                <div class="item"><a href="profile.html">👤 Profile</a>
                                </div>
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
    header.appendChild(headerhtml);
    aside.appendChild(asidehtml);
    document.getElementById("logoutsidebar").addEventListener("click", logout);
    document.getElementById("logoutBtn").addEventListener("click", logout);
    function logout() {
      signOut(auth)
        .then(() => {
            window.location.href = '../../templates/login.html'
          alert("Sign out successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
