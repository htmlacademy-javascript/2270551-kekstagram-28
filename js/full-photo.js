import { picturesContainer } from './miniatures.js';
import { isEscapeKey } from './util.js';
import { miniaturesData } from './main.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialContainer = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader ');
const COMMENT_SHOW_COUNT = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUsersModal();
  }
};

const openUsersModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.addEventListener('click', loadComment);
};

function closeUsersModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.removeEventListener('click', loadComment);
}

const clearComments = () => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
};

const createComment = (array) => {
  array.comments.forEach((item) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    newComment.classList.add('hidden');
    commentsContainer.append(newComment);
  });
};

const createDataPhoto = (data) => {
  bigPictureImg.src = data.url;
  bigPictureImg.alt = data.description;
  likesCount.textContent = data.likes;
  socialCaption.textContent = data.description;
};

const showComment = (array, count) => {
  for (let i = 0; i < count; i++) {
    array[i].classList.remove('hidden');
  }
  socialCommentCount.textContent = `${socialContainer.querySelectorAll('li:not(.hidden)').length} из ${socialContainer.children.length} комментариев`;
};

function loadComment() {
  const hiddenComments = socialContainer.querySelectorAll('.hidden');
  if (hiddenComments.length > COMMENT_SHOW_COUNT) {
    showComment(hiddenComments, COMMENT_SHOW_COUNT);
  } else if (hiddenComments.length <= COMMENT_SHOW_COUNT) {
    showComment(hiddenComments, hiddenComments.length);
    socialCommentsLoader.classList.add('hidden');
  }
}

const openFullPhoto = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const target = evt.target.closest('.picture');
    const currentItem = miniaturesData.find((item) => item.id === +target.dataset.id);
    openUsersModal();
    createDataPhoto(currentItem);
    clearComments();
    createComment(currentItem);
    loadComment();
  }
};

picturesContainer.addEventListener('click', openFullPhoto);

bigPictureClose.addEventListener('click', () => {
  closeUsersModal();
});
