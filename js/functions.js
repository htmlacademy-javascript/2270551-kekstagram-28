const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const container = document.querySelector('.pictures');

const renderPhotos = (array) => {
  array.forEach (({url, description, comments, likes}) => {
    const picElem = pictureTemplate.cloneNode (true);
    picElem.querySelector('.picture_img').src = url;
    picElem.querySelector('.picture_img').alt = description;
    picElem.querySelector('.picture_comments').textContent = comments.length;
    picElem.querySelector('.picture_likes').textContent = likes;
    fragment.appendChild(picElem);
  });
  return container.appendChild(fragment);
};

export {renderPhotos};


