// Get the form element
const form = document.getElementById('form');

// Add event listener to the form
form.addEventListener('submit', async (event) => {
// Prevent the default form submit behavior
event.preventDefault();

// Get the file input element
const fileInput = document.getElementById('file');

// Get the file from the input element
const file = fileInput.files[0];

// Send the file to the server using fetch API
const response = await fetch('/route/to/handle/photo/upload', {
method: 'POST',
body: file
});

// Get the response from the server
const data = await response.json();

// Do something with the response, for example, display a message
if (data.success) {
alert('Photo uploaded successfully');
} else {
alert('Error uploading photo');
}
});