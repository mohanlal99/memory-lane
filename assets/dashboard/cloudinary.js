const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dehamh3j6/upload";

document.addEventListener("DOMContentLoaded", () => {
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  const photosInput = document.getElementById("photos");

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dehamh3j6/image/upload";
  const UPLOAD_PRESET = "memory-lane";

  function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          console.log("Image uploaded successfully:", data.secure_url);
        //   showImagePreview(data.secure_url);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

//   function showImagePreview(url) {
//     uploadedImagePreview.src = url;
//     uploadedImagePreview.style.display = "block";
//   }

  uploadImageBtn.addEventListener("click", () => {
    const files = photosInput.files;
    if (files.length > 0) {
      uploadImage(files[0]);
    } else {
      alert("Please select an image to upload");
    }
  });
});
