//display profile
const entryUrl = 'http://127.0.0.1:5000/api/v1/profile';
fetch(entryUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})
.then(response =>{
  if (response.status === 401){
    window.location.href = '/index.html';
    throw new Error('Unauthorized');
  }else{
   return response.json();
  }
})
.then(data => {
    document.getElementById('name').innerText = data.details[1]
    document.getElementById('email').innerText = data.details[0] 
})
.catch(error => {
    alert('Error fetching');
});


//delete user acc
let del_url ='http://127.0.0.1:5000/api/v1/del_account'
function deleteAccount() {
  var confirmDelete = confirm("Are you sure you want to delete your acc?");
  if (confirmDelete){
      fetch(del_url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to delete acc');
          }
          console.log('acc deleted successfully.');
          window.location.href =  'http://127.0.0.1:5500/index.html';
      })
      .catch(error => {
          console.error('Error deleting:', error);
      });
  }
}
