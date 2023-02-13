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




