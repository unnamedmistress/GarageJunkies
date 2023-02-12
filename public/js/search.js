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
    // Init the map
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: listings[0].latitude, lng: listings[0].longitude }
  });
    listings.forEach((listing) => {
      const marker = new google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map,
        title: listing.address,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

