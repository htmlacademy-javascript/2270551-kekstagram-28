
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPhoto = ({url, description, comments, likes}) => {
  const picElem = pictureTemplate.cloneNode (true);
  picElem.querySelector('.picture__img').src = url;
  picElem.querySelector('.picture__img').alt = description;
  picElem.querySelector('.picture__comments').textContent = comments.length;
  picElem.querySelector('.picture__likes').textContent = likes;


  /* picElem.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(url, description, comments, likes);
  }); */

  return picElem;
};

const renderPhotos = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const picElem = createPhoto (picture);
    fragment.append(picElem);
  });
  container.append(fragment);
};

const clearPhotos = (pictures) => {
  pictures.appendChild = '';
};

const removePictures = (pictures) => {
  const photos = pictures.querySelectorAll('.picture');
  if (photos) {
    photos.forEach((photo) => photo.remove());
  }
};

export {renderPhotos, clearPhotos, removePictures, container };
