const picturesList = document.querySelector('.pictures');
const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createElement = ({url, comments, likes, id}) => {
  const pictureClone = picture.cloneNode(true);
  pictureClone.querySelector('.picture__img').src = url;
  pictureClone.querySelector('.picture__img').dataset.id = id;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  return pictureClone;
};

const renderThumbnails = (photos) => {
  const similarThumbnails = document.createDocumentFragment();
  photos.forEach((element) => {
    const thumbnail = createElement(element);
    similarThumbnails.append(thumbnail);
  });

  picturesList.append(similarThumbnails);
};

export { renderThumbnails };
