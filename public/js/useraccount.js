// Get the form elements
const form = document.getElementById('user-account-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-button');

// Update the user's account information
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  submitButton.setAttribute('disabled', 'disabled');

  // Get the updated user information from the form inputs
  const name = nameInput.value;
  const email = emailInput.value;

  try {
    // Send a PUT request to the back-end to update the user's account information
    const response = await fetch('/useraccount', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    // Check if the request was successful
    if (response.ok) {
      // If the request was successful, show a success message
      alert('User account updated successfully!');
    } else {
      // If the request was not successful, show an error message
      alert('Failed to update user account. Please try again later.');
    }
  } catch (error) {
    // If there was an error sending the request, show an error message
    alert('Failed to update user account. Please try again later.');
  } finally {
    // Re-enable the submit button
    submitButton.removeAttribute('disabled');
  }
});

// Delete the user's account
const deleteButton = document.getElementById('delete-button');

deleteButton.addEventListener('click', async (event) => {
  event.preventDefault();

  // Confirm that the user wants to delete their account
  const confirmDelete = confirm('Are you sure you want to delete your account?');

  if (confirmDelete) {
    try {
      // Send a DELETE request to the back-end to delete the user's account information
      const response = await fetch('/useraccount', {
        method: 'DELETE'
      });

      // Check if the request was successful
      if (response.ok) {
        // If the request was successful, show a success message and redirect the user to the homepage
        alert('User account deleted successfully!');
        window.location.href = '/';
      } else {
        // If the request was not successful, show an error message
        alert('Failed to delete user account. Please try again later.');
      }
    } catch (error) {
      // If there was an error sending the request, show an error message
      alert('Failed to delete user account. Please try again later.');
    }
  }
});
