let responseDisplay = document.getElementById('response')
let diaryContent = document.getElementById('contentInput2')

diaryContent.addEventListener('input', clearResponse);

// Function to clear response messages
function clearResponse() {
    responseDisplay.textContent = '';
}


function openModal() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('overlay');
  document.getElementById('response').textContent = '';
  overlay.style.display = 'none';
  overlay.classList.remove('active');
}


const addContent = document.getElementById('contentForm');
addContent.addEventListener("submit", function(event){
  event.preventDefault();
  const content = document.getElementById('contentInput2').value;
  let newcontent = {
    'content':content
  }

  let url = 'http://127.0.0.1:5000/api/v1/add_entries';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`

      },
      body: JSON.stringify(newcontent, null, 2)
    })
  .then(response => response.json())
  .then(data => {
    if(data.Error){
      document.getElementById('response').innerText = data.Error;
    }
    else if(data.success){
      closeModal();
      location.reload();
    }
  })
  .catch(error => {
    alert('An error occurred. try again later')
  });
});


let url = 'http://127.0.0.1:5000/api/v1/get_entries';
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
})
.then(response => {
  if (response.status === 401){
    window.location.href = 'http://127.0.0.1:5500/index.html';
    throw new Error('Unauthorized');
  }else{
    return response.json();
  }
})
.then(data => {
  let par_node = document.getElementById('diaryContent')
    for (let entry of data['user_entries']){
      let entry_id = entry[0]
      let entry_content = entry[1];
      let entry_date = entry[2];
      

      let content = document.createElement('div');
      content.id = 'Content'; 

      let ent_date = document.createElement('div');
      ent_date.id = 'entrydate';
      ent_date.innerText = entry_date;

      let cont = document.createElement('div');
      cont.id = 'Diaryitems';
      cont.innerText = entry_content;

      let btn = document.createElement('div');
      btn.id = 'viewButton';
      btn.innerHTML = `<a href="#" onclick="viewEntry(${entry_id})">View</a>`;
      

      // Append child nodes to the content node
      content.appendChild(ent_date);
      content.appendChild(cont);
      content.appendChild(btn)

      // Append content node to the parent node
      par_node.appendChild(content);
  }
  })
.catch(error => {
  console.log('Error:', error);
});
 

//logout
function userlogout() {
  fetch('http://127.0.0.1:5000/api/v1/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('error');
      }
      window.location.href =  'http://127.0.0.1:5500/index.html';
  })
  .catch(error => {
      alert('error occurred. Try again later')
  });
}

function viewEntry(entry_id){
  window.location.href = `http://127.0.0.1:5500/entry.html?entry_id=${entry_id}`;
}