
import { isEnterKey, isEscapeKey } from './util.js';
import { createTemplateList, clearTemplateList } from './thumbnail.js';

const thumbnailModalElement = document.querySelector('.big-picture');
const containerBody = document.querySelector('body');
const thumbnailModalOpen = document.querySelectorAll('.picture');
const thumbnailModalClose = thumbnailModalElement.querySelector('.big-picture__cancel');

// Функция закрытия окна при нажатии на Esc
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeThumbnailModal();
  }
};

// Функция открытия окна при нажатии фото
function openThumbnailModal() {
  thumbnailModalElement.classList.remove('hidden');
  containerBody.classList.add('modal-open');
  createTemplateList();
  document.addEventListener('keydown', onModalEscKeydown);
}

// Функция очистки обрабочтика
function closeThumbnailModal() {
  thumbnailModalElement.classList.add('hidden');
  clearTemplateList();
  document.removeEventListener('keydown', onModalEscKeydown);
}

//Обработчик открытия модального окна для каждого изображения
for (let i = 0; i < thumbnailModalOpen.length; i++) {
  thumbnailModalOpen[i].addEventListener('click', () => {
    openThumbnailModal();
  });
}

//Обработчик открытия модального окна
thumbnailModalOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openThumbnailModal();
  }
});

//Обработчик закрытия модального окна
thumbnailModalClose.addEventListener('click', () => {
  closeThumbnailModal();
});

//Обработчик закрытия модального окна по клавише Enter
thumbnailModalClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeThumbnailModal();
  }
});
