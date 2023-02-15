const search = document.querySelector('form');

search.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from user input
  let zip = document.querySelector('#zipcode').value;
  let item = document.querySelector('#item-search').value;
  const user = await fetch('/api/users')

  try {
    // Fetch to backend to get listing data
    let url = `/api/search/${zip}?zipCode=${zip}`;
    if (item) {
      url += `&item=${item}`;
    }
    const res = await fetch(url);
    // If response is successful, redirect user to search page
    //  if (res.ok) {
    //  window.location.replace(url);
    //  window.location.href= '/search';
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
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
      addListings(listings)
    });
    // }
  } catch (err) {
    console.error(err);
  }
});
function addListings(listings) {
  console.log(listings);
  const projectsDiv = document.getElementById('projectDiv')
  projectsDiv.innerHTML = "";
  listings.forEach((listing) => {
  
    const divEl = document.createElement("div")
      divEl.classList.add("listing-item");
    divEl.innerHTML = `
    <div class="row mb-3 project">
  <div class="col-md-4">
    <form action="/profile" method="post" enctype="multipart/form-data">
</form>
  <a href="/project/${listing.id}">${listing.item_name}</a>
    <p>
      <span for="img" aria-label="money">💲</span>
      <!-- Pass needed_funding value to the helper function -->
      <span class="dollar-amount">${listing.price}</span>
    </p>
    <p>Created by Ashlynn</p>
  </div>
  <div class="col-md-7 pt-2">
     <p>Address of listing: ${listing.street_address} ${listing.city} ${listing.state}, ${listing.zip}</p>
    <p>
      ${listing.description}
    </p>
 <img src="../${listing.photo}" height = "100px" width = "150px" alt = "project photo">
  </div>
  </div>
    `;
    projectsDiv.appendChild(divEl);
  });
}