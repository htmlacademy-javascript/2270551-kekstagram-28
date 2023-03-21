
const userBigPictureEl = document.querySelector('.big-picture');
const minPicOpenEl = document.querySelector('.picture');
const xButton = document.querySelectorAll('#picture-cancel');

minPicOpenEl.addEventListener('click', () => {
  userBigPictureEl.classList.remove('hidden');
});

xButton.addEventListener('click', () => {
  userBigPictureEl.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    userBigPictureEl.classList.add('hidden');
  }
});

export {}
