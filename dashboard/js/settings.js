import { getUserDetails } from "../../assets/dashboard/getUserDetails.js";
import { getCurrentUser } from "../../assets/dashboard/getUser.js";

document.addEventListener("DOMContentLoaded", async () => {
  const firestoreUser = await getUserDetails();
  const authUser = getCurrentUser();

  const darkModeToggle = document.getElementById("darkMode");
  const notificationsToggle = document.getElementById("notifications");
  const locationToggle = document.getElementById("location");
  const privacyToggle = document.getElementById("privacy");
  const saveBtn = document.getElementById("saveSettings");

  // 🔹 Load saved settings from Firestore
  const userSettings = firestoreUser.settings || {};
  darkModeToggle.checked = userSettings.darkMode || false;
  notificationsToggle.checked = userSettings.notifications || false;
  locationToggle.checked = firestoreUser.locationPreferences?.shareLocation || false;
  privacyToggle.checked = userSettings.privateProfile || false;

  // 🔹 Restore Dark Mode from localStorage (if user enabled before)
  if (localStorage.getItem("darkMode") === "enabled" || userSettings.darkMode) {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }

  // 🔹 Listen for dark mode toggle switch
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // 🔹 Save button (persist settings)
  saveBtn.addEventListener("click", async () => {
    const updatedSettings = {
      darkMode: darkModeToggle.checked,
      notifications: notificationsToggle.checked,
      privateProfile: privacyToggle.checked,
    };

    const updatedLocation = {
      shareLocation: locationToggle.checked,
    };

    console.log("Saving settings...", updatedSettings, updatedLocation);

    // TODO: Firestore update function here
    // await updateUserSettings(authUser.uid, updatedSettings, updatedLocation);

    alert("Settings saved successfully!");
  });
});
