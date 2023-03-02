/*---------КОНСТАНТЫ-----------*/
//Сообщения для комментария
const MESSAGES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];

//Описание фотографии для комментария
const DESCRIPTIONS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];

//Имена пользователей для комментария
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

/*---------МАГИЧЕСКИЕ ЗНАЧЕНИЯ-----------*/
const PHOTOS_OBJECTS_COUNT = 25;

const MV_STARTING_VALUE_PHOTOS = 1;
const MV_FINAL_VALUE_PHOTOS = 25;

const MV_STARTING_VALUE_LIKES = 15;
const MV_FINAL_VALUE_LIKES = 200;

const MV_STARTING_VALUE_AVATARS = 1;
const MV_FINAL_VALUE_AVATARS = 6;

/*---------ФУНКЦИИ-----------*/
//Получение уникальных ID
const getGeneraRandomlId = (min, max) => {
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

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

//Получениеслучайных ID из указанного диапазона
const createRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getGeneraRandomlId(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    // проверка на уникальность элементов в массиве в цикле
    //определяет, содержит ли массив определенное значение среди своих записей, возвращая true или false при необходимости.
    while (previousValues.includes(currentValue)) {
      currentValue = getGeneraRandomlId(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//Поиск случайного элемента в переданном массиве. (декомпозиция)
const getRandomArrayElement = (elements) => elements[getGeneraRandomlId(0, elements.length - 1)];

/*---------ВЫЗОВ ФУНКЦИИ-----------*/
//идентификатор опубликованной фотографии
const generatePhotosId = createRandomIdFromRange(MV_STARTING_VALUE_PHOTOS, MV_FINAL_VALUE_PHOTOS);
generatePhotosId();
//количество лайков, поставленных фотографии
const generateLikes = createRandomIdFromRange(MV_STARTING_VALUE_LIKES, MV_FINAL_VALUE_LIKES);
generateLikes();

//Случайная аватарка для комментариев
const generateAvatars = createRandomIdFromRange(MV_STARTING_VALUE_AVATARS, MV_FINAL_VALUE_AVATARS);
generateAvatars();

/*---------СОЗДАНИЕ ОБЪЕКТА-----------*/
const createPublishedPhoto = () => {
  const photoId = generatePhotosId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_COMMENTS),
    likes: generateLikes(),
    comments: [{
      id: photoId,
      avatar: `img/avatar-${generateAvatars()}.svg`,
      message: getRandomArrayElement(MESSAGES_COMMENTS),
      name: getRandomArrayElement(NAMES_COMMENTS),
    }],
  };
};

const similarPhotos = Array.from({ length: PHOTOS_OBJECTS_COUNT }, createPublishedPhoto);
similarPhotos();
