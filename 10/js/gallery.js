/* 1 модуль отрисовки окна с полноразмерным изображением */
import {createPictures, pictureContainer} from './pictures.js';
import {renderBigPictureData, bigPicture} from './big-picture.js';
import {isEscKey, isEnterKey} from './utils.js';


/* количество коментов на страничке */
const COMMENTS_COUNT = 5;

const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');


let commentsShown = 0;
let comments = [];


/* 5 убираем большую картинку по кнопке esc */
const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

/* 2 разметка комментариев под большой фотографией */
const createComment = ({avatar, message, name}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  /* открытие и закрытие коментариев более 5 в большом окне */
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

  /* функция проверки склонения слова после числа */
  function commentsDeclination(n, textForms) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n1 > 1) {
      return textForms[1];
    }
    if (n1 === 1 && n1 !== 11) {
      return textForms[0];
    }
    return textForms[1];
  }
  /* заменяем содержимое класса .social__comments на пустую строку */
  commentList.innerHTML = '';
  /* вставляем в содержимое класса .social__comments данные из fragment */
  commentList.append(fragment);
  /* формируем сообщение о количестве комментариев */
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> ${commentsDeclination(comments.length, ['коментария', 'коментариев'])}`;
};

/* открытие большого окна по нажатию на миниатюру */
const openModal = (picture) => {
  /* убираем hidden показываем большую картинку */
  bigPicture.classList.remove('hidden');
  /* 4 добавляем тегу body класс modal-open чтобы убрать прокрутку */
  document.body.classList.add('modal-open');
  /* соответствие миниатюры и большой фото */
  document.addEventListener('keydown', onDocumentKeydown);
  renderBigPictureData(picture);
  comments = picture.comments;
  if (comments.length > 0) {
    commentsShown = 0;
    renderComments();
  }
};

/* функция закрытия большого окна */
function closeModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
/* отслеживание события "клик" для закрытия окна */
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
