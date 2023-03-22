/* модуль отрисовки полноразмерного изображения */
const userBigPictureEl = document.querySelector('.big-picture');
const minPicOpenEl = document.querySelector('.picture');
const xButton = document.querySelectorAll('#picture-cancel');
/* убираем класс hidden у большого изображения */
minPicOpenEl.addEventListener('click', () => {
  userBigPictureEl.classList.remove('hidden');
});
/* закрытие окна по крестику */
xButton.addEventListener('click', () => {
  userBigPictureEl.classList.add('hidden');
});
/* закрытие окна по esc */
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    userBigPictureEl.classList.add('hidden');
  }
});
