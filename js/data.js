/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousdataJSON = localStorage.getItem('javascript-local-storage');

if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('javascript-local-storage', dataJSON);
});

// function renderEntry(entry) {
//   var $entryLi = document.createElement('li');
//   $entryLi.setAttribute('class', 'column-half');
//   var $imagediv = document.createElement('div');
//   $imagediv.setAttribute('class', 'imagediv');
//   $entryLi.appendChild($imagediv);
//   var $entryimage = document.createElement('img');
//   $entryimage.setAttribute('src', entry.photoinput);
//   $imagediv.appendChild($entryimage);
// }
