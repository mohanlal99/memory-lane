# 🧠 Memory Lane Project 

**Memory Lane** is a digital scrapbook application that allows users to capture, organize, and relive their memories. It provides features such as memory creation with multimedia support, albums, tags, AI-generated videos, and an interactive memory map.

**Project Type:** Full-Stack

- 🌍 [Live](https://memory-lane-rosy.vercel.app/)  
- 🎥 [Video Explaination](https://www.youtube.com/watch?v=zIvinAdAvk4)

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, Javascript
- **Backend:**  Firebase, Firebase Firestore
- **Database:** MongoDB (Mongoose)  
- **Authentication:** Firebase Auth
- **Deployment:** Vercel (Frontend)


## ✨ Features

- 🔐 **User Authentication**: Secure login and signup with Firebase Authentication.  
- 📝 **Memory Entry Creation**: Create memories with photos, notes, videos, and locations.  
- 📚 **Albums**: Group memories into albums (e.g., vacations, events).  
- 🔍 **Search Memories**: Search by tags, dates, or keywords.  
- 🗺️ **Interactive Map**: Explore memories via Leaflet map integration.   
 
- 🌙 **Dark Mode**: Toggle between light and dark themes.  


---

## 📂 Project Structure

```bash
memory-lane/
├── index.html                 # Landing page
├── login.html                 # Login page
├── signup.html                # Signup page
├── dashboard.html             # User dashboard
│
├── 📂 assets
│   ├── 📂 css
│   │   ├── globles.css        # Global styles
│   │   └── main.css           # Main theme styles
│   │
│   ├── 📂 js
│   │   ├── auth.js            # Firebase authentication logic
│   │   ├── db.js              # Firestore database setup
│   │   ├── signup-login.js    # Signup & login handling
│   │   ├── memory.js          # Memory creation & management
│   │   ├── album.js           # Album creation & handling
│   │   ├── profile.js         # Profile management
│   │   ├── reminisce.js       # Reminisce feature logic
│   │   ├── map.js             # Leaflet interactive map
│   │   ├── ai-video.js        # AI memory video generator
│   │   ├── search.js          # Search functionality
│   │   ├── export.js          # Data export (albums/timelines)
│   │   ├── dark-mode.js       # Dark mode toggle
│   │   └── utils.js           # Utility/helper functions
│
├── 📂 dashboard
│   ├── create-memory.html     # Create new memory
│   ├── albums.html            # View all albums
│   ├── album.html             # Single album view
│   ├── memory-card.html       # Memory card template
│   ├── map.html               # Interactive map page
│   ├── reminisce.html         # Reminisce feature page
│   ├── ai-memory-video.html   # AI-generated video page
│   └── profile.html           # User profile settings
│
├── 📂 templates
│   ├── memory-card.html       # Memory card component
│   ├── album-card.html        # Album card component
│   ├── navbar.html            # Navbar layout
│   ├── footer.html            # Footer layout
│   └── modals.html            # Modals for actions (edit, delete, etc.)
│
├── 📂 images                  # Static assets & placeholders
│
└── README.md                  # Project documentation

```

## 📸 Screenshots

### 🖼️ Home Page
![Home Page](/images/showcase/dashboard.png)

### 📝 Create Memory
![Create Memory](/images/showcase/create-memory.png)

### 🗂️ Albums View
![Albums](/images/showcase/album.png)

### 🗺️ Memory Map
![Memory Map](/images/showcase/map.png)
