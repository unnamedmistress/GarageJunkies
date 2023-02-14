const search = document.querySelector('form');

search.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from user input
  let zip = document.querySelector('#zipcode').value;
  let item = document.querySelector('#item-search').value;

  try {
    // Fetch to backend to get listing data
    let url = `/api/search/${zip}?zipCode=${zip}`;
      if (item) {
        url += `&item=${item}`;
      }
    const res = await fetch(url);
    const listings = await res.json();
    // Init the map
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: listings[0].latitude, lng: listings[0].longitude }
  });

  // Create marker for each listing
    listings.forEach((listing) => {
      const marker = new google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map,
        title: listing.street_address,
      });
      
  // Create the info window for map marker
  let infoWindow = new google.maps.InfoWindow({
  content: `
      <div>${listing.street_address} ${listing.city} ${listing.state}, ${listing.zip}</div>
      <div>${listing.item_name}</div>
  `
});
      // Associate the info window with clicking the marker
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
        });

    });
  } catch (err) {
    console.error(err);
  }
});

