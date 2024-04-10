
// single item 
// Retrieve the entry_id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const entry_id = urlParams.get('entry_id');

// Fetch the entry data using the retrieved entry_id
const entryUrl = `http://127.0.0.1:5000/api/v1/get_entry/${entry_id}`;
fetch(entryUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
})
.then(response =>{
  if (response.status === 401){
    window.location.href = 'http://127.0.0.1:5500/login.html';
    throw new Error('Unauthorized');
  }else{
   return response.json();
  }
})
.then(data => {
  document.getElementById('entrydate').innerText = data.user_entry.date;
  document.getElementById('editableContent').innerText = data.user_entry.content;
    
})
.catch(error => {
    console.log('Error fetching entry:', error);
});


//updatecontent
function makeEditable(){
  var edit = document.getElementById('editableContent');
  var button = document.getElementById('editButton');
  edit.contentEditable = (edit.contentEditable === 'true') ? 'false' : 'true';
  button.textContent = (edit.contentEditable === 'true') ? 'Save' : 'Edit';

  if (edit.contentEditable === 'true') {
    console.log('Content is now editable.');
} else {

    var modifiedContent = edit.innerText; 
    fetch(`http://127.0.0.1:5000/api/v1/update_entry/${entry_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            content: modifiedContent     
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save content');
        }
        window.location.href = window.location.href = 'http://127.0.0.1:5500/entries.html';
    })
    .catch(error => {
        alert('Error saving content:', error);
    });
}
 }

//delete content
function deleteEntry() {
    var confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
        // Send a request to the backend to delete the entry
        fetch(`http://127.0.0.1:5000/api/v1/delete_entry/${entry_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete entry');
            }
            window.location.href = window.location.href = 'http://127.0.0.1:5500/entries.html';
        })
        .catch(error => {
           alert('Error deleting entry:', error);
        });
    }
}

