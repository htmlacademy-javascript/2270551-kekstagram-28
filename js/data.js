import {getRandomInteger} from './utils.js';

const NAMES = [
  'Павел Позняк',
  'Екатерина Некрылова',
  'Александр Страховенко',
  'Балтика Пивандров',
  'Сигарет Курилов',
  'Евгений Мухоморов'
];

const DESCRIPTIONS = [
  'Чиллю на отдыхе',
  'Кот Кекс спит на диване',
  'Это мы прогуливаем пары',
  'С друзьями решили сдать бутылки',
  'Курим у падоса',
  'Какая шикарная погодка...',
  'Отпуск в Турции',
  'Зоопарк',
  'Голубое небо',
  'Аквариум с рыбками',
  'Вкусный ужин в ресторане',
  'Пошли с друзьями в бар',
  'Играем в волейбол',
  'Соревнование по баскетболу',
  'Пошли качаться в зал',
  'Моя тачка',
  'Синяя птичка',
  'Мой любимый сидр',
  'Бургер в Макухе',
  'Дождь в Иркутске',
  'Вышел прогуляться',
  'Острые крылышки',
  'Любимый вариант завтрака',
  'На пробежке',
  'Пошел выносить мусор'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const POSTS_COUNT = 25;

let postId = 1;
let commentId = 1;

const createMessage = (messages) => {
  const message = Array.from({length: getRandomInteger(1, 2)}, () => messages[getRandomInteger(0, messages.length - 1)]);

  return [...new Set(message)].join(' ');
};

const createCommentData = () => {
  const comment = {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(MESSAGES),
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };

  commentId++;

  return comment;
};

const createPostData = () => {
  const post = {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(3, 11)}, createCommentData)
  };

  postId++;

  return post;
};

const createPostsDataset = () => Array.from({length: POSTS_COUNT}, createPostData);

export {createPostsDataset};
