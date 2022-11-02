var $submitPhoto = document.getElementById('photoinput');
var $image = document.querySelector('img');
var $entryForm = document.forms[0];
var $titleInput = document.getElementById('titleinput');

$submitPhoto.addEventListener('input', function (event) {
  $image.removeAttribute('src');
  $image.setAttribute('src', event.target.value);
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
