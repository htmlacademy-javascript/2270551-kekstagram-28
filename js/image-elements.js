import {createPostsArray} from './data.js';

const usersImagesList = document.querySelector('.pictures');
const imageElementTamplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPublications = createPostsArray();

const usersPublicationsFragment = document.createDocumentFragment();

usersPublications.forEach(({id, url, description, comments, likes}) => {
  const imageElement = imageElementTamplate.cloneNode(true);
  imageElement.querySelector('.picture__img').src = url;
  imageElement.querySelector('.picture__img').alt = description;
  imageElement.querySelector('.picture__comments').innerHTML = comments.length;
  imageElement.querySelector('.picture__likes').textContent = likes;
  imageElement.dataset.thumbnailId = id;

  usersPublicationsFragment.appendChild(imageElement);
});

usersImagesList.appendChild(usersPublicationsFragment);

export {usersImagesList, usersPublications};
