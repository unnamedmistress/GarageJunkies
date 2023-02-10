//The form has fields for a username, email, and password. When someone fills out the form and clicks the "sign up" button, the information is sent to the back-end of the website. This is done by using a special tool called "fetch" which sends the information to the back-end so it can be saved and used later. The code makes sure the information is sent correctly and tells the website what to do if there are any problems.
//Ensure there is an end point /signup //

// Form IDs to match the login.handlebars are name-signup, email-signup, password-signup

// Listen for the DOM to finish loading
//The form has fields for a username, email, and password. When someone fills out the form and clicks the "sign up" button, the information is sent to the back-end of the website. This is done by using a special tool called "fetch" which sends the information to the back-end so it can be saved and used later. The code makes sure the information is sent correctly and tells the website what to do if there are any problems.
//Ensure there is an end point /signup //

// Form IDs to match the login.handlebars are name-signup, email-signup, password-signup

// Listen for the DOM to finish loading
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
