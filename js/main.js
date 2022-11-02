var $submitPhoto = document.getElementById('photoinput');
var $image = document.getElementById('entryimg');
var $entryForm = document.forms[0];
var $titleInput = document.getElementById('titleinput');

// lines 8 and 13-14 are temporary
// img should be set from local storage in data.js

var $firstimg = document.getElementById('firstimg');

$submitPhoto.addEventListener('input', function (event) {
  $image.removeAttribute('src');
  $image.setAttribute('src', event.target.value);
  $firstimg.removeAttribute('src');
  $firstimg.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var newObject = {};
  newObject.titleinput = $titleInput.value;
  newObject.photoinput = document.forms[0].elements.photoinput.value;
  newObject.notesinput = document.forms[0].elements.notesinput.value;
  newObject.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(newObject);
  $image.removeAttribute('src');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
