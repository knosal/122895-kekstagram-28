//---ФУНКЦИИ
//Получение уникальных ID
function getGeneraRandomlId(min, max) {
  /*
    Math.ceil   - Возвращает наименьшее целое число, большее или равное его числовому аргументу.
    Math.min    - Возвращает меньшее из набора предоставленных числовых выражений.
    Math.max    - Возвращает большее из набора предоставленных числовых выражений.
    Math.abs    - Возвращает абсолютное значение числа.
    Math.random - Возвращает псевдослучайное число от 0 до 1.
    Math.floor  - Возвращает наибольшее целое число, меньшее или равное его числовому аргументу.
  */
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower; // ??

  return Math.floor(result);
}

//Получениеслучайных ID из указанного диапазона
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getGeneraRandomlId(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return `Перебраны все числа из диапазона от ' + ${min} + ' до ' + ${max}`;
    }
    // проверка на уникальность элементов в массиве в цикле
    while (previousValues.includes(currentValue)) {
      currentValue = getGeneraRandomlId(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Конкатенация адреса, генерируемого ID и расширения
const concatenatePathRandomIdExtension = (path, id, extension) => path + id + extension;

//Поиск случайного элемента в переданном массиве.
const getRandomArrayElement = (elements) => elements[getGeneraRandomlId(0, elements.length - 1)];

//---МАССИВЫ ЭЛЕМЕТОВ:
//Сообщения для комментария
const messageListForComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.'
];
//Имена пользователей для комментария
const namesListForComments = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

//---ВЫЗОВ ФУНКЦИИ:
//идентификатор опубликованной фотографии
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
generatePhotoId();
//количество лайков, поставленных фотографии
const generateLikes = createRandomIdFromRangeGenerator(15, 200);
generateLikes();
//Случайная аватарка для комментариев
const generateAvatar = createRandomIdFromRangeGenerator(1, 6);
generateAvatar();
/*
+ id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
description, строка — описание фотографии. Описание придумайте самостоятельно.
likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
      Количество комментариев к каждой фотографии вы определяете на своё усмотрение.
      Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
      {
        id: 135,
        avatar: 'img/avatar-6.svg',
        message: 'В целом всё неплохо. Но не всё.',
        name: 'Артём',
      }
        id      — идентификатор любое число. Идентификаторы не должны повторяться.
        avatar  — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
        message — Для формирования текста комментария — вам необходимо взять одно или два случайных предложения из представленных.
        name    — Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

/*-----------------------------------*/

//Функция создания объекта
const createPublishedPhoto = () => {
  const PhotoId = generatePhotoId();
  return {
    id: PhotoId,
    url: concatenatePathRandomIdExtension('photos/', PhotoId, '.jpg'),
    description: '',
    likes: generateLikes(),
    comments: [{
      id: PhotoId,
      avatar: concatenatePathRandomIdExtension('img/avatar-', generatePhotoId(), '.svg'),
      message: messageListForComments[getGeneraRandomlId(0, messageListForComments.length - 1)],
      name: getRandomArrayElement[namesListForComments],
    }],
  };
};

createPublishedPhoto();
