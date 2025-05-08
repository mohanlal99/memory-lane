document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("locationInput");
  const locationBtn = document.getElementById("locationButton");
  const map = L.map("map").setView([28.6139, 77.209], 5); //india center point
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attriibution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  let mapMarker;
  map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    if (mapMarker) {
      mapMarker.setLatLng(e.latlng);
    } else {
      mapMarker = L.marker(e.latlng).addTo(map);
    }
    locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  //   locationbtn onlcikc
  locationBtn.addEventListener("click", () => {
    map.locate({ setView: true, maxZoom: 10 });
  });

  map.on("locationfound", function (e) {
    const { lat, lng } = e.latlng;
    if (mapMarker) {
      mapMarker.setLatLng(e.latlng);
    } else {
      mapMarker = L.marker(e.latlng).addTo(map);
    }
    locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  map.on("locationerror", function (e) {
    alert("Please Enable your location Give permissions");
  });

});
/**
  
  const locationInput = document.getElementById("locationInput");
  const locationBtn = document.getElementById("locationButton");

  const map = L.map("map").setView([28.6139, 77.209], 5); // India Center
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  let marker;

  map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }

    // ✅ Save lat/lng in the input field properly
    locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  locationBtn.addEventListener("click", () => {
    map.locate({ setView: true, maxZoom: 13 });
  });

  map.on("locationfound", function (e) {
    const { lat, lng } = e.latlng;
    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(emapMarker.latlng).addTo(map);
    }

    // ✅ Update input with found location
    locationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  map.on("locationerror", function (e) {
    alert("Unable to retrieve your location");
  });
  
 */
