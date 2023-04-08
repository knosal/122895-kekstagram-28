import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { pristineReset } from './validate.js';
import { closeMessage } from './message.js';

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const inputUploadFile = document.querySelector('#upload-file');
const updateForm = document.querySelector('.img-upload__form');
const overlayForm = updateForm.querySelector('.img-upload__overlay');
const overlayCloseButtonForm = updateForm.querySelector('#upload-cancel');
const submitButton = updateForm.querySelector('.img-upload__submit');

const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

//Функция удаления обработчика Esc при фокусе на окне хэштега
const deleteEscHashtagField = () => {
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция удаления обработчика Esc при фокусе на окне комментариев
const deleteEscCommentField = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция открытия окна при нажатии фото
const openFormOverlay = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);

  deleteEscHashtagField();
  deleteEscCommentField();
};

inputUploadFile.addEventListener('change', openFormOverlay);

// Функци блокировки кнопки "Опубликовать" перед отправкой запроса на сервер
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Функци разблокировки кнопки "Опубликовать" после получения ответа
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//Функция закрытия фото
const closeFormOverlay = () => {
  resetScale(); //сбрасываем масштаб
  resetEffects(); //сбрасываем эффекты
  pristineReset(); //сбрасываем pristine
  updateForm.reset(); //сбрасываем данные формы
  closeMessage(); //сбрасываем данные модалки сообщения
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
};

overlayCloseButtonForm.addEventListener('click', closeFormOverlay);

//Функция закрытия модального окна
function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormOverlay();
  }
}

export {
  openFormOverlay,
  closeFormOverlay,
  blockSubmitButton,
  unblockSubmitButton,
  onModalEscKeydown
};
