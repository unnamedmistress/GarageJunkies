const newFormHandler = async (event) => {
    event.preventDefault();
  
    const item_name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
    const price = document.querySelector('#project-price').value.trim();
    const streetAddress = document.getElementById('project-address').value.trim();
    const city = document.getElementById('project-city').value.trim();
    const state = document.getElementById('project-state').value.trim();
    const zip = document.getElementById('project-zipcode').value.trim();
    const photo = document.getElementById('project-upload');
    const data = new FormData();
    data.append('photo', photo.files[0]);
    data.append('description', description);
    data.append('price', price);
    data.append('streetAddress', streetAddress);
    data.append('city', city);
    data.append('state', state);
    data.append('zip', zip);
    data.append('item_name', item_name);


    const address = `${streetAddress} ${city}, ${state} ${zip}`


    if (item_name && description &&price && address) {
      const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: data
      });
  
      if (response.ok) {
        document.location.replace('/profile');
        console.log('IT WORKED!')
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  