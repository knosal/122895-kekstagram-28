import { getPhotos } from './setup.js';

const thumbnailGalleryElement = document.querySelector('.pictures'); // секция для отображения фотографий
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const createTemplates = getPhotos(); //массив генерируемых фотографий
//const thumbnailModalElement = document.querySelector('.big-picture__preview');

// Функция отрисовки фотографий в галлереи
const createTemplateList = () => {
  const listFragment = document.createDocumentFragment();

  createTemplates.forEach(({ url, description, likes, comments }) => {
    const templateElement = templateFragment.cloneNode(true);
    templateElement.querySelector('.picture__img').src = url;
    templateElement.querySelector('.picture__img').tabIndex = '0';
    templateElement.querySelector('.picture__img').alt = description;
    templateElement.querySelector('.picture__likes').textContent = likes;
    templateElement.querySelector('.picture__comments').textContent = comments.length;
    listFragment.append(templateElement);
  });

  thumbnailGalleryElement.append(listFragment);
};
/*
// Функция отрисовки фотографий в модальном окне
const createTemplateListModal = () => {
  const listFragmentModal = document.createDocumentFragment();

  createTemplates.forEach(({ url, description, likes, comments }) => {
    const templateModalElement = templateFragment.cloneNode(true);
    templateModalElement.querySelector('.picture__img').src = url;
    templateModalElement.querySelector('.picture__img').alt = description;
    templateModalElement.querySelector('.picture__likes').textContent = likes;
    templateModalElement.querySelector('.picture__comments').textContent = comments.length;
    listFragmentModal.append(templateModalElement);
  });

  thumbnailModalElement.append(listFragmentModal);
};
*/
// Функция очистки отрисовки фотографий в модальном окне
const clearTemplateList = () => {
  //imageModalElement.innerHTML = '';
};

export { createTemplateList, clearTemplateList };
