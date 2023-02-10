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


// Fetch to backend to get listing data
async function getListings(zipCode, item) {
  // Get values from user search input
  let zipCode = document.querySelector('#zipcode').value;
  let item = document.querySelector('#item').value;
  const response = await fetch(`/api/listings?${zipCode}&${item}`);
  const listings = await response.json();
  return listings;
};

// Place markers on map for each listing
async function displayListings(zipCode, item) {
  const listings = await getListings(zipCode, item);

  // Create marker for each listing
  listings.forEach(listing => {
    const marker = new google.maps.Marker({
      position: { lat: listing.latitude, lng: listing.longitude },
      map: map
    });
  });
}

