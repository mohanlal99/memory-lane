import { getAllMermories } from "../js/getAllMemories.js";

document.addEventListener("DOMContentLoaded", async () => {

  let memoryLocations = await getAllMermories()
    console.log(memoryLocations)
  // const memoryLocations = [
  //   {
  //     lat: 28.6139,
  //     lng: 77.2090,
  //     title: "New Delhi",
  //     description: "Visited India Gate, 2023",
  //     image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  //   },
  //   {
  //     lat: 19.0760,
  //     lng: 72.8777,
  //     title: "Mumbai",
  //     description: "Marine Drive sunset, 2022",
  //     image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  //   },
  //   {
  //     lat: 12.9716,
  //     lng: 77.5946,
  //     title: "Bangalore",
  //     description: "Startup meetup, 2021",
  //     image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
  //   },
  // ];

    const map = L.map("map").setView([23.6139, 80.209], 4); //india center point
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attriibution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  
    let mapMarker;
    // map.on("click", function (e) {
    //   const { lat, lng } = e.latlng;
    //   if (mapMarker) {
    //     mapMarker.setLatLng(e.latlng);
    //   } else {
    //     mapMarker = L.marker(e.latlng).addTo(map);
    //   }
    //   locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    //   updateLoctionAddress(lat , lng);
    // });

    memoryLocations.forEach(item => {
      const [latStr, lngStr] = item.location.code.split(",").map(s => s.trim());
      let image = item.photos.split(',')[0]
      const marker = L.marker([latStr, lngStr]).addTo(map);
      
      // // Custom popup content with small preview and full on hover
      const popupContent = `
        <div class="popup-preview">
          <img src="${image}" alt="${item.title}" />
          <div class="popup-text">
            <strong>${item.title}</strong>
            <p>${item.description}</p>
          </div>
        </div>
      `;
  
      marker.bindPopup(popupContent).openPopup();
    });
  
   
  
    // map.on("locationfound", function (e) {
    //   const { lat, lng } = e.latlng;
    //   if (mapMarker) {
    //     mapMarker.setLatLng(e.latlng);
    //   } else {
    //     mapMarker = L.marker(e.latlng).addTo(map);
    //   }
    //   console.log(e);
    //   locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    //   updateLoctionAddress(lat , lng);
    // });
  
    // map.on("locationerror", function (e) {
    //   alert("Please Enable your location Give permissions");
    // });
  
 
  });
 
  