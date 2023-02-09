
// Logout component
const logoutBtn = document.querySelector('#logout-button');


logoutBtn.addEventListener('click', () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
      console.log('Success! Logged out', data);
      localStorage.removeItem('user');
    })
      .catch(error => {
      console.error('Error: Unable to logout:', error);
  });

});
