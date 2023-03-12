
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPhoto = ({url, description, comments, likes}) => {
  const picElem = pictureTemplate.cloneNode (true);
  picElem.querySelector('.picture__img').src = url;
  picElem.querySelector('.picture__img').alt = description;
  picElem.querySelector('.picture__comments').textContent = comments.length;
  picElem.querySelector('.picture__likes').textContent = likes;

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

export {renderPhotos};


