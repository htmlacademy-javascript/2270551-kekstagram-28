const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const container = document.querySelector('.pictures');

const renderPhotos = (array) => {
  array.forEach (({url, description, comments, likes}) => {
    const picElem = pictureTemplate.cloneNode (true);
    picElem.querySelector('.picture__img').src = url;
    picElem.querySelector('.picture__img').alt = description;
    picElem.querySelector('.picture__comments').textContent = comments.length;
    picElem.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(picElem);
  });
  return container.appendChild(fragment);
};

export {renderPhotos};


