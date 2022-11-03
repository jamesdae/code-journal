var $submitPhoto = document.getElementById('photoinput');
var $image = document.getElementById('entryimg');
var $entryForm = document.forms[0];
var $titleInput = document.getElementById('titleinput');
var $entryList = document.querySelector('ul.row');

var $entryClass = document.querySelector('.entry');
var $entriesClass = document.querySelector('.entries');

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
  newObject.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(newObject);
  $image.removeAttribute('src');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryList.prepend(preEntry());
  $entryClass.classList.add('hidden');
  $entriesClass.classList.remove('hidden');
  $entryForm.reset();
});

function preEntry(entry) {
  var $entryLi = document.createElement('li');
  $entryLi.setAttribute('class', 'row');

  var $firstcolumn = document.createElement('div');
  $firstcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($firstcolumn);

  var $imagediv = document.createElement('div');
  $imagediv.setAttribute('class', 'imagediv');
  $firstcolumn.appendChild($imagediv);

  var $entryimage = document.createElement('img');
  $entryimage.setAttribute('src', document.forms[0].elements.photoinput.value);
  $imagediv.appendChild($entryimage);

  var $secondcolumn = document.createElement('div');
  $secondcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($secondcolumn);

  var $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'textdiv');
  $secondcolumn.appendChild($textDiv);

  var $entryheading = document.createElement('h2');
  $entryheading.setAttribute('class', 'entryheading');
  $entryheading.textContent = $titleInput.value;
  $textDiv.appendChild($entryheading);

  var $entrytext = document.createElement('p');
  $entrytext.setAttribute('class', 'entrytext');
  $entrytext.innerText = document.forms[0].elements.notesinput.value;
  $textDiv.appendChild($entrytext);
  return $entryLi;
}

var $newButton = document.querySelector('.new');
$newButton.addEventListener('click', function (event) {
  $entryClass.classList.remove('hidden');
  $entriesClass.classList.add('hidden');
});
