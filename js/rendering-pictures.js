import {createPostsDataset} from './data.js';
import {openBigPicture} from './open-big-picture.js';

const postsDataset = createPostsDataset();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPicture = (data) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__comments').textContent = data.comments.length;
  picture.querySelector('.picture__likes').textContent = data.likes;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(data);
  });

  return picture;
};

const renderPictures = () => {
  postsDataset.forEach((data) => picturesList.append(createPicture(data)));
};

export {renderPictures};
