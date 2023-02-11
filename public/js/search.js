const search = document.querySelector('form');

search.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from user input
  let zip = document.querySelector('#zipcode').value;
  // let item = document.querySelector('#item-search').value;

  try {
    // Fetch to backend to get listing data
    const res = await fetch(`/api/search/${zip}?zipCode=${zip}`);
    const listings = await res.json();
      return(listings);
  } catch (err) {
    console.error(err);
  }
});



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
