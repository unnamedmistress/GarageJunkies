// Submit event listener for the login form
const login = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the username and password values from user input
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Validate the username and password values
  if (!username || !password) {
    alert('Username and password are required');
    return;
  }

  // Send a POST request to the back-end API with the username and password
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
      

  })
    .then(res => res.json())
    .then(data => {
      console.log('Success! Logged in', data);
    })
    .catch(error => {
      console.error('Error: Unable to login:', error);
    });
});
