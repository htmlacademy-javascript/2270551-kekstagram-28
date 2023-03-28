const bigPicture = document.querySelector('.big-picture');

const renderBigPictureData = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};
/* находим класс big-picture и подставляем адрес описание лайки
 и альтернативный текст */
export {renderBigPictureData, bigPicture};
