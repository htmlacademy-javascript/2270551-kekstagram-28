
import {createPictures, pictureContainer} from './pictures.js';
import {renderBigPictureData, bigPicture} from './big-picture.js';
import {isEscKey, isEnterKey} from './utils.js';


const COMMENTS_COUNT = 5;

const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');

let commentsShown = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const createComment = ({avatar, message, name}) => {
  const comment = document.createElement('li');
  comment.textContent = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {

  commentsShown += COMMENTS_COUNT;
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }


  const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      return genitivePlural;
    }
    switch(num % 10){
      case 1: return nominative;
      case 2: return genitiveSingular;
    }
    return genitivePlural;
  };

  commentList.innerHTML = '';

  commentList.append(fragment);

  commentCount.textContent = `${commentsShown} из <span class="comments-count">${comments.length}</span> ${numDecline(comments.length,'коментарий','коментария','коментариев')}`;
};


const openModal = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPictureData(picture);
  comments = picture.comments;
  if (comments.length > 0) {
    commentsShown = 0;
    renderComments();
  }
};

function closeModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
bigPictureCloseElement.addEventListener('click', () => {
  closeModal();
});

bigPictureCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

const onCommentsLoaderClick = () => renderComments();
commentsLoader.addEventListener('click', onCommentsLoaderClick);

const createGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('[data-picture-element-id]');
    if (!pictureElement) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find((item) => item.id === +pictureElement.dataset.pictureElementId);
    openModal(picture);
  });
  createPictures(pictures, pictureContainer);
};

export {createGallery};
