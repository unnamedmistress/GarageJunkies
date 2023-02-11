// Global Variables
let geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';
const button = document.getElementById("search");
// Get values from user input
let zip = document.querySelector('#zipcode').value;
let item = document.querySelector('#item-search').value;

// button.addEventListener('submit', async (e) => {
//   e.preventDefault();

// Fetch to backend to get listing data
async function getListings(zipCode, item) {
  // Get values from user search input
  let zip = document.querySelector('#zipcode').value;
  let item = document.querySelector('#item-search').value;
  const response = await fetch(`/api/search/${zip}&${item}`);
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
