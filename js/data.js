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
