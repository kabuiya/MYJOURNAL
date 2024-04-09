
  const formelement = document.getElementById('signupForm');
  formelement.addEventListener("submit", function(event){
    event.preventDefault();
    let formdata = new FormData(formelement);
    const username = formdata.get('username');
    const email = formdata.get('email');
    const password1 = formdata.get('password1');
    const password2 = formdata.get('password2');

    if (password1 === password2) {
      let userdata = {
        'username': username,
        'email_address': email,
        'password': password2
      };
      let url = 'http://127.0.0.1:5000/api/v1/register';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          if (data.error.username) {
            document.getElementById('usernameResponse').innerText = data.error.username;
          } else if (data.error.email) {
            document.getElementById('emailResponse').innerText = data.error.email;
          } else if (data.error.details) {
            document.getElementById('formError').innerText = data.error.details;
          }
        } else if(data.message.success) {
          window.location.href = 'http://127.0.0.1:5500/login.html'
        }
      })
      .catch(error => {
        document.getElementById('formError').innerText = "An unexpected error occurred. Please try again later.";
      });
    } else {
      let displaypassworderror = document.getElementById('passwordResponse');
      displaypassworderror.innerText = 'Password does not match';
    }
  });


  const usernameInput = document.getElementById('usernameInput');
  const passwordInput1 = document.getElementById('passwordInput1');
  const passwordInput2 = document.getElementById('passwordInput2');
  const emailInput = document.getElementById('emailInput')

  const usernameResponse = document.getElementById('usernameResponse');
  const passwordResponse = document.getElementById('passwordResponse');
  const emailResponse = document.getElementById('emailResponse');
  const loginError = document.getElementById('formError');
  
  
  usernameInput.addEventListener('input', clearResponseMessage);
  passwordInput1.addEventListener('input', clearResponseMessage);
  passwordInput2.addEventListener('input', clearResponseMessage);
  emailInput.addEventListener('input', clearResponseMessage);
  
  // Function to clear response messages
  function clearResponseMessage() {
      loginError.textContent =''
      usernameResponse.textContent = '';
      passwordResponse.textContent = '';
      emailResponse.textContent = '';
  }
