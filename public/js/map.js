// Global Variables
let geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';
const button = document.getElementById("search");

// Initialize GoogleMaps
function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: 28.538336, lng: -81.379234 }
  });
  return map;
};

 // Call the map
 initMap();




