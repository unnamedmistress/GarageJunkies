//The form has fields for a username, email, and password. When someone fills out the form and clicks the "sign up" button, the information is sent to the back-end of the website. This is done by using a special tool called "fetch" which sends the information to the back-end so it can be saved and used later. The code makes sure the information is sent correctly and tells the website what to do if there are any problems.
//Ensure there is an end point /signup //

// Form IDs to match the login.handlebars are name-signup, email-signup, password-signup

// Listen for the DOM to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the form element
    const form = document.querySelector('form');
  
    // Listen for the form's submit event
    form.addEventListener('submit', function(event) {
      // Prevent the form from submitting
      event.preventDefault();
  
      // Get the values of the form inputs
      const username = document.querySelector('#username').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      // Validate the form inputs
      if (!username || !email || !password) {
        // Display an error message if any of the inputs are empty
        alert('Please fill out all fields');
        return;
      }
      // Hash the password using bcrypt
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
          console.error(err);
          return;
        }
        // Make an AJAX call to the back-end API to sign up the user
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: hash
          })
        })
          .then(response => {
            // Check if the response was successful
            if (!response.ok) {
              throw new Error('Failed to sign up');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            // Redirect the user to the home page or display a success message
          })
          .catch(error => {
            console.error(error);
            // Display an error message to the user
            alert('Failed to sign up');
          });
      });
    });
  });
