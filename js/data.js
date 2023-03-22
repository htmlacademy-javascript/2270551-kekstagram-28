import {
  getRandomInteger,
  getUniqNumberFromRange,
  uniqValue,
  getRandomElement
} from './util.js';

const ARRAY_LENGTH = 25;

const DESCRIPTIONS = [
  'С друзьями',
  'На природе',
  'Всем привет!',
  'На море',
  'В горах',
  'Дома',
];

const USERS_NAMES = [
  'Илья',
  'Игорь',
  'Антон',
  'Александр',
  'Даниил'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const values = {
  photoId: {
    min: 1,
    max: 25
  },
  url: {
    min: 1,
    max: 25
  },
  likes: {
    min: 15,
    max: 200
  },
  avatar: {
    min: 1,
    max: 6
  },
  comment: {
    min: 1,
    max: 2
  }
};

const getUniqPhotoId = getUniqNumberFromRange(values.photoId.min, values.photoId.max);
const getUniqUrl = getUniqNumberFromRange(values.url.min, values.url.max);

const createComment = () => ({
  id: uniqValue(),
  avatar: `img/avatar-${getRandomInteger(values.avatar.min, values.avatar.max)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(USERS_NAMES)
});

const createComments = () => {
  const commentsArray = Array.from({length: getRandomInteger(values.comment.min, values.comment.max)}, createComment);
  return commentsArray;
};

const createMockPhotos = () => ({
  id: getUniqPhotoId(),
  url: `photos/${getUniqUrl()}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomInteger(values.likes.min, values.likes.max),
  comments: createComments()
});

const createPhotos = () => Array.from({length: ARRAY_LENGTH}, createMockPhotos);

export { createPhotos };
