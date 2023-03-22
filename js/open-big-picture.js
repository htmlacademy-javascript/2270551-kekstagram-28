const COMMENTS_STEP_VALUE = 5;

const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const closeButton = document.querySelector('.big-picture__cancel');

const commentsContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

let commentsCounter = 0;
let totalCommentsQuantity = 0;
let commentsDataset = [];

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
};

const onCommentsLoaderButtonClick = () => {
  if (commentsDataset.length <= COMMENTS_STEP_VALUE) {
    commentsLoader.classList.add('hidden');
  }

  renderComments();
};

const addListeners = () => {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
};

const removeListeners = () => {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
};

const createComment = (data) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = data.avatar;
  newComment.querySelector('.social__picture').alt = data.name;
  newComment.querySelector('.social__text').textContent = data.message;

  commentsCounter++;

  return newComment;
};

function renderComments () {
  commentsDataset.splice(0, COMMENTS_STEP_VALUE).forEach((item) => commentsList.append(createComment(item)));
  commentsContainer.innerHTML = `${commentsCounter} из <span class="comments-count">${totalCommentsQuantity}</span> комментариев`;
}

const fillBigPicture = (data) => {
  pictureImage.src = data.url;
  pictureLikesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  pictureCaption.textContent = data.description;
};

const openBigPicture = (data) => {
  commentsList.innerHTML = '';

  totalCommentsQuantity = data.comments.length;
  commentsDataset.push(...data.comments.slice());

  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (totalCommentsQuantity <= COMMENTS_STEP_VALUE) {
    commentsLoader.classList.add('hidden');
  }

  fillBigPicture(data);
  renderComments();
  addListeners();
};

function closeBigPicture () {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');

  commentsCounter = 0;
  totalCommentsQuantity = 0;
  commentsDataset = [];

  removeListeners();
}

export {openBigPicture};
