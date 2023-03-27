const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictures = (pictures) => {
  const pictureContainerFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, comments, likes, id}) => {
    const picElem = pictureTemplate.cloneNode(true);
    picElem.querySelector('.picture__img').src = url;
    picElem.querySelector('.picture__img').alt = description;
    picElem.querySelector('.picture__comments').textContent = comments.length;
    picElem.querySelector('.picture__likes').textContent = likes;
    picElem.dataset.pictureElementId = id;
    pictureContainer.append(picElem);
  });

  pictureContainer.append(pictureContainerFragment);
};

export {createPictures, pictureContainer};
