const fullPictureContainer = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comments');

const image = fullPictureContainer.querySelector('img');
const likesCount = fullPictureContainer.querySelector('.likes-count');

const fillComment = ({avatar, message, name}) => {
  const commentClone = commentTemplate.cloneNode(true);
  const commentImage = commentClone.querySelector('.social__picture');
  commentImage.src = avatar;
  commentImage.alt = name;

  const text = commentClone.querySelector('.social__text');
  text.textContent = message;

  return commentClone;
};

const renderComments = (comments) => commentsList.append(...comments.map(fillComment));

const renderFullSizePhoto = ({url, likes, comments}) => {
  image.src = url;
  likesCount.textContent = likes;
  commentsList.innerHTML = '';
  renderComments(comments, commentsList);
};

export { renderFullSizePhoto };
