
const bigPicture = document.querySelectorAll('.big-picture');
const fullPhoto = document.querySelector('.big-picture__img');

for(let i = 0; i < bigPicture.length; i++) {
  bigPicture(i).addEventListener('click', function() {
    fullPhoto.src = photos [i];
  });
}

