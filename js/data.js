/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousdataJSON = localStorage.getItem('javascript-local-storage');
var $temp = document.querySelector('.temp');

if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
  $temp.classList.add('hidden');
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('javascript-local-storage', dataJSON);
});

function renderEntry(entry) {
  var $entryLi = document.createElement('li');
  $entryLi.setAttribute('class', 'row');

  var $firstcolumn = document.createElement('div');
  $firstcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($firstcolumn);

  var $imagediv = document.createElement('div');
  $imagediv.setAttribute('class', 'imagediv');
  $firstcolumn.appendChild($imagediv);

  var $entryimage = document.createElement('img');
  $entryimage.setAttribute('src', entry.photoinput);
  $imagediv.appendChild($entryimage);

  var $secondcolumn = document.createElement('div');
  $secondcolumn.setAttribute('class', 'column-half');
  $entryLi.appendChild($secondcolumn);

  var $textDiv = document.createElement('div');
  $textDiv.setAttribute('class', 'textdiv');
  $secondcolumn.appendChild($textDiv);

  var $entryheading = document.createElement('h2');
  $entryheading.setAttribute('class', 'entryheading');
  $entryheading.textContent = entry.titleinput;
  $textDiv.appendChild($entryheading);

  var $entrytext = document.createElement('p');
  $entrytext.setAttribute('class', 'entrytext');
  $entrytext.innerText = entry.notesinput;
  $textDiv.appendChild($entrytext);
  return $entryLi;
}

var $entryList = document.querySelector('ul.row');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
});
