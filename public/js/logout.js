
// Logout component
const logoutBtn = document.querySelector('#logout');


logoutBtn.addEventListener('click', () => {
    fetch('/api/users/logout', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
    })
      // .then(res => res.json())
      .then(data => {
      console.log('Success! Logged out', data);
      localStorage.removeItem('user');
      window.location.href = '/login';
    })
      .catch(error => {
      console.error('Error: Unable to logout:', error);
  });

});
