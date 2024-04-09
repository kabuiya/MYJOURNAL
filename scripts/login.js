const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const usernameResponse = document.getElementById('usernameResponse');
const passwordResponse = document.getElementById('passwordResponse');
const loginError = document.getElementById('formError')


usernameInput.addEventListener('input', clearResponseMessage);
passwordInput.addEventListener('input', clearResponseMessage);

// Function to clear response messages
function clearResponseMessage() {
    loginError.textContent =''
    usernameResponse.textContent = '';
    passwordResponse.textContent = '';
}

const loginform = document.getElementById('form');
loginform.addEventListener("submit", function(event){
event.preventDefault();
let formdata = new FormData(loginform);
const username = formdata.get('username');
const password = formdata.get('password');


let userdata = {
    'username': username,
    'password': password
  };
  let url = 'http://127.0.0.1:5000/api/v1/login';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userdata)
  })
  .then(response => response.json())
  .then(data => {
    if (data.Error) {
      if (data.Error.username) {
        document.getElementById('usernameResponse').innerText = data.Error.username;
      } else if (data.Error.password) {
        document.getElementById('passwordResponse').innerText = data.Error.password;
      } else if (data.Error.details) {
        document.getElementById('formError').innerText = data.Error.details;
      }
    } else if(data.message.success) {
      // Save the token to local storage and redirect user to entries page
      localStorage.setItem('token', data.message.token);
      console.log(localStorage.getItem('token'));
      window.location.href = 'http://127.0.0.1:5500/entries.html'
    }
  })
  .catch(error => {
    document.getElementById('formError').innerText = "An unexpected error occurred. Please try again later.";
  });

});



