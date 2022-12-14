/* global data */
/* exported data */

var $submitPhoto = document.getElementById('photoinput');
var $image = document.getElementById('entryimg');
var $entryForm = document.forms[0];
var $titleInput = document.getElementById('titleinput');
var $entryList = document.querySelector('ul.row');
var $temp = document.querySelector('.temp');
var $entryClass = document.querySelector('.entry');
var $entriesClass = document.querySelector('.entries');
var $notesinput = document.getElementById('notesinput');
var $editHeading = document.querySelector('.entry > h1');
var $deleteLink = document.querySelector('a.deletelink');

$submitPhoto.addEventListener('input', function (event) {
  function isValidUrl(url) {
    try {
      return Boolean(new URL(event.target.value));
    } catch (e) {
      return false;
    }
  }
  if (isValidUrl(event.target.value)) {
    $image.removeAttribute('src');
    $image.setAttribute('src', event.target.value);
  }
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var newObject = {};
  newObject.titleinput = $titleInput.value;
  newObject.photoinput = document.forms[0].elements.photoinput.value;
  newObject.notesinput = document.forms[0].elements.notesinput.value;
  if (data.editing !== null) {
    newObject.entryId = data.editing.entryId;
    var oldEntries = $entryList.querySelectorAll('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newObject.entryId) {
        data.entries[i] = newObject;
        oldEntries[i].replaceWith(renderEntry(newObject));
      }
    }
  } else {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift(newObject);
    $entryList.prepend(renderEntry(newObject));
  }
  $entryForm.reset();
  $temp.classList.add('hidden');
  showEntries();
});

var $entrynav = document.getElementById('entrynav');
$entrynav.addEventListener('click', showEntries);

var $newButton = document.querySelector('.new');
$newButton.addEventListener('click', function () {
  if (data.editing === null) {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $submitPhoto.removeAttribute('value');
    $titleInput.removeAttribute('value');
    $notesinput.innerText = null;
    $editHeading.innerText = 'New Entry';
  }
  if (!$deleteLink.classList.contains('hidden')) {
    $deleteLink.classList.add('hidden');
  }
  $entryForm.reset();
  showForm();
});

function showEntries() {
  $entryClass.classList.remove('shown');
  $entryClass.classList.add('hidden');
  $entriesClass.classList.remove('hidden');
  $entriesClass.classList.add('shown');
  data.view = 'entries';
  data.editing = null;
}

function showForm(event) {
  $entriesClass.classList.remove('shown');
  $entryClass.classList.remove('hidden');
  $entriesClass.classList.add('hidden');
  $entryClass.classList.add('shown');
  data.view = 'entry-form';
}

function renderEntry(entry) {
  var $entryLi = document.createElement('li');
  $entryLi.setAttribute('class', 'row');
  $entryLi.setAttribute('data-entry-id', entry.entryId);

  var $firstcolumn = document.createElement('div');
  $firstcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($firstcolumn);

  var $imagediv = document.createElement('div');
  $imagediv.setAttribute('class', 'imagediv');
  $firstcolumn.appendChild($imagediv);

  var $entryimage = document.createElement('img');
  $entryimage.setAttribute('src', entry.photoinput);
  $entryimage.className = 'imagecontain';
  $imagediv.appendChild($entryimage);

  var $secondcolumn = document.createElement('div');
  $secondcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($secondcolumn);

  var $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'textdiv');
  $secondcolumn.appendChild($textDiv);

  var $titlerow = document.createElement('div');
  $titlerow.setAttribute('class', 'titlerow row');
  $textDiv.appendChild($titlerow);

  var $entryheading = document.createElement('h2');
  $entryheading.setAttribute('class', 'entryheading');
  $entryheading.textContent = entry.titleinput;
  $titlerow.appendChild($entryheading);

  var $editbutton = document.createElement('i');
  $editbutton.setAttribute('class', 'fa-solid fa-pencil');
  $titlerow.appendChild($editbutton);

  var $entrytext = document.createElement('p');
  $entrytext.setAttribute('class', 'entrytext');
  $entrytext.innerText = entry.notesinput;
  $textDiv.appendChild($entrytext);
  return $entryLi;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
    $temp.classList.add('hidden');
  }
  showView(data.view);
});

function showView(string) {
  data.view = string;
  if (string === 'entry-form') {
    showForm();
    if (data.editing !== null) {
      $image.setAttribute('src', data.editing.photoinput);
      $submitPhoto.setAttribute('value', data.editing.photoinput);
      $titleInput.setAttribute('value', data.editing.titleinput);
      $notesinput.innerText = data.editing.notesinput;
      $editHeading.innerText = 'Edit Entry';
      $deleteLink.classList.remove('hidden');
    }
  } else {
    showEntries();
  }
}

$entryList.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-pencil')) {
    showForm();
    var targetLi = event.target.closest('li');
    var targetId = targetLi.getAttribute('data-entry-id');
    var targetSrc = targetLi.querySelector('img').getAttribute('src');
    var targetTitle = targetLi.querySelector('.entryheading').innerText;
    var targetNotes = targetLi.querySelector('.entrytext').innerText;
    $image.setAttribute('src', targetSrc);
    $submitPhoto.setAttribute('value', targetSrc);
    $titleInput.setAttribute('value', targetTitle);
    $notesinput.innerText = targetNotes;
    $editHeading.innerText = 'Edit Entry';
    $deleteLink.classList.remove('hidden');
    for (var i = 0; i < data.entries.length; i++) {
      if ((data.entries[i].entryId) === +targetId) {
        data.editing = data.entries[i];
      }
    }
  }
});

function showModal(event) {
  var $deleteModal = document.createElement('div');
  $deleteModal.setAttribute('class', 'modal column-full');

  var $popUp = document.createElement('div');
  $popUp.setAttribute('class', 'popup column-half row');
  $deleteModal.appendChild($popUp);

  var $modaltext = document.createElement('div');
  $modaltext.setAttribute('class', 'modaltext column-full');
  $popUp.appendChild($modaltext);

  var $deleteText = document.createElement('p');
  $deleteText.innerText = 'Are you sure you want to delete this entry?';
  $deleteText.setAttribute('class', 'cancelp');
  $modaltext.appendChild($deleteText);

  var $cancelButton = document.createElement('button');
  $cancelButton.setAttribute('class', 'cancel modalbutton');
  $cancelButton.innerText = 'CANCEL';
  $popUp.appendChild($cancelButton);

  var $confirmButton = document.createElement('button');
  $confirmButton.setAttribute('class', 'confirm modalbutton');
  $confirmButton.innerText = 'CONFIRM';
  $popUp.appendChild($confirmButton);

  $entryClass.appendChild($deleteModal);

  function removeModal() {
    $entryClass.removeChild($deleteModal);
  }

  $cancelButton.addEventListener('click', removeModal);

  $confirmButton.addEventListener('click', function (event) {
    var oldEntries = $entryList.querySelectorAll('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1);
        $entryList.removeChild(oldEntries[i]);
        showEntries();
      }
    }
    removeModal();
    if ($entryList.innerText === '') {
      $temp.classList.remove('hidden');
    }
  });
}

$deleteLink.addEventListener('click', showModal);
