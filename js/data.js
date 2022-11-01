/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  var formJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', formJSON);
});
