// Global Variables
let geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';
const search = document.querySelector('form');

// let item = document.querySelector('#item-search').value;

search.addEventListener('submit', async (e) => {
  e.preventDefault();
// Get values from user input
let zip = document.querySelector('#zipcode').value;
   
  try {
    const res = await fetch(`/api/search/${zip}?zipCode=${zip}`);
    const listings = await res.json();
      return(listings);
  } catch (err) {
    console.error(err);
  }
});



// // Fetch to backend to get listing data
// async function getListings(zipCode) {
//   const response = await fetch(`/api/search/${zip}`);
//   const listings = await response.json();
//   return listings;
// };


// // Place markers on map for each listing
// async function displayListings(zipCode, item) {
//   const listings = await getListings(zipCode, item);

//   // Create marker for each listing
//   listings.forEach(listing => {
//     const marker = new google.maps.Marker({
//       position: { lat: listing.latitude, lng: listing.longitude },
//       map: map
//     });
//   });
// }
