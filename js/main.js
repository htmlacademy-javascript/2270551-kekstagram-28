const PHOTO_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const COMENT_COUNT = 20;
const AVTOR_NAMES = ['Ivan', 'Boris', 'Svetlana', 'John'];
const MES_AVTORS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const DESCRIPT_PHOTO = ['прекрасное настроение', 'как-то так!', 'долго старался чтоб поймать момент','лучший кадр!'];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatedCommentId = createIdGenerator();

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () =>
  getRandomArrayElement(MES_AVTORS)).join('');

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(AVTOR_NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPT_PHOTO),
  likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
  comments: Array.from(
    {length: getRandomInteger(0, COMENT_COUNT)},
    createComment
  ),
});

const getPictures = () =>
  Array.from({length: PHOTO_COUNT}, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );
getPictures();
