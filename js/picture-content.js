const renderContainer = document.querySelector('.big-picture');
const bigPictureSelector = renderContainer.querySelector('.big-picture__img');
const bigPictureSrc = bigPictureSelector.querySelector('img');
const bigPictureLikesCount = renderContainer.querySelector('.likes-count');
const bigPictureCommentsLength = renderContainer.querySelector('.comments-count');
const bigPictureDescription = renderContainer.querySelector('.social__caption');
const commentsField = renderContainer.querySelector('.social__comments');

const renderPostContent = (element) => {
  bigPictureSrc.src = element.url;
  bigPictureSrc.alt = element.description;
  bigPictureLikesCount.textContent = element.likes;
  bigPictureCommentsLength.textContent = element.comments.length;
  bigPictureDescription.textContent = element.description;
};

const commentElementTamplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const usersCommentsFragment = document.createDocumentFragment();

const renderComments = (element) => {
  commentsField.innerHTML = '';
  const usersComments = element.comments;

  usersComments.forEach(({avatar, message, name}) => {
    const commentElement = commentElementTamplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    usersCommentsFragment.appendChild(commentElement);
  });

  commentsField.appendChild(usersCommentsFragment);
};

export {renderPostContent, renderComments};
