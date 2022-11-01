var $submitPhoto = document.getElementById('photoinput');
var $image = document.querySelector('img');
$submitPhoto.addEventListener('input', function (event) {
  $image.removeAttribute('src');
  $image.setAttribute('src', event.target.value);
  // console.log(event.target.value);
});
