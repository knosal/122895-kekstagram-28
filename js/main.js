const PHOTOS_OBJECTS_COUNT = 25;
const LIKES_MIN_VALUE = 15;
const LIKES_MAX_VALUE = 200;
const AVATARS_MIN_VALUE = 1;
const AVATARS_MAX_VALUE = 6;
const COMMENTS_VALUE = 10;
const MESSAGES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];
const DESCRIPTIONS_COMMENTS = [
  'Летний чил на юга.',
  'Тестим новую камеру!.',
  'Тусим с друзьями на даче',
  'Отлично кормят',
  'Отдыхаем...',
  'Цените каждое мгновение!',
  'Супер тачка!!!'
];
const NAMES_COMMENTS = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Коля',
  'Киборг',
  'Туся',
  'Сергей',
  'Кирилл',
  'Дмитрий',
  'Константин',
  'Вячеслав',
  'Марина',
  'Анасасия',
  'Александр',
  'Айгуль',
  'Алексей',
  'Георгий',
  'Роман',
  'Владилав',
  'Антон',
];

//Получение уникальных ID в заданном диапазоне
const getGeneraRandomId = (min, max) => {
  /*
    Math.ceil   - Возвращает наименьшее целое число, большее или равное его числовому аргументу.
    Math.min    - Возвращает меньшее из набора предоставленных числовых выражений.
    Math.max    - Возвращает большее из набора предоставленных числовых выражений.
    Math.abs    - Возвращает абсолютное значение числа.
    Math.random - Возвращает случайное число от 0 (вкл) до 1 (не вкл).
    Math.floor  - Округляет до ближайшего меньшего.
  */
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Поиск случайного элемента в переданном массиве. (декомпозиция)
const getRandomArrayElement = (array) => array[getGeneraRandomId(0, array.length - 1)];

// Получение номера комментария
const getRandomIdComments = () => {
  let lastGaneratedId = 0;
  return () => {
    lastGaneratedId += 1;
    return lastGaneratedId;
  };
};

const createIdComments = getRandomIdComments();

/*---------СОЗДАНИЕ ОБЪЕКТА-----------*/
const createComment = () => ({
  id: createIdComments(),
  avatar: `img/avatar-${getGeneraRandomId(AVATARS_MIN_VALUE, AVATARS_MAX_VALUE)}.svg`,
  message: getRandomArrayElement(MESSAGES_COMMENTS),
  name: getRandomArrayElement(NAMES_COMMENTS),
});

const createPublishedPhoto = (photoId) => ({
  id: photoId,
  url: `photos/${photoId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_COMMENTS),
  likes: getGeneraRandomId(LIKES_MIN_VALUE, LIKES_MAX_VALUE),
  comments: Array.from({ length: getGeneraRandomId(0, COMMENTS_VALUE) }, createComment),
});

const similarPhotos = () =>
  Array.from({ length: PHOTOS_OBJECTS_COUNT }, (_, pictureIndex) =>
    createPublishedPhoto(pictureIndex + 1)
  );

similarPhotos();
