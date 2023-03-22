
import {container, renderPhotos} from './pictures.js';
/* import {renderPostContent, renderComments} from './picture-content.js'; */

const bigPictureWindow = document.querySelector('.big-picture');
const commentsCount = bigPictureWindow.querySelector('.social__comment-count');
const commentsLoader = bigPictureWindow.querySelector('.comments-loader');
const bigPictureClose = bigPictureWindow.querySelector('.big-picture__cancel');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
  }
};

function openBigPicture (id) {
  bigPictureWindow.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  renderPostContent(id);
  renderComments(id);
}

function closeBigPicture () {
  bigPictureWindow.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

container.addEventListener('click', (evt) => {
  evt.preventDefault();
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  const picture = renderPhotos.find((item) => item.id === Number(thumbnail.dataset.thumbnailId));

  if (evt.target.closest('.picture')) {
    openBigPicture(picture);
  }
});

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

const isEscapeKey = (evt) => evt.key === 'Escape';

export {openBigPicture};
