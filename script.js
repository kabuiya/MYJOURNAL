

function openModal() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  overlay.classList.add('active');
}

function closeModal() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  overlay.classList.remove('active');
}


function makeEditable(){
  console.log("key")
  var edit = document.getElementById('editableContent');
  edit.contentEditable = (edit.contentEditable === 'true') ? 'false' : 'true';
    }


function showElement(){
  const ele = document.getElementById('profile').innerText
  const ele1 = document.getElementById('profile2').innerText
  console.log(ele)
  console.log(ele1)
}


