import { isEscapeKey } from './util.js';

const HASH_TAG = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_HASHTAG_MESSAGE = 'Проверте правильность ввода символов';
const ERROR_COMMENTS_MESSAGE = 'Максимальная длина комментария 140 символов';
const MAX_COUNT_HASTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const inputUploadFile = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const overlayCloseButtonForm = document.querySelector('#upload-cancel');
const updateForm = document.querySelector('.img-upload__form');

const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

/*----- ФОРМА -----*/
//Функция удаления обработчика Esc при фокусе на окне хэштега
const deleteEscKeydownForHashField = () => {
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция удаления обработчика Esc при фокусе на окне комментариев
const deleteEscKeydownForTextField = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Создание экземплятор валидатора и передача в него элемента формы
const pristine = new Pristine(updateForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

//Функция открытия окна при нажатии фото
const openFormOverlay = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  deleteEscKeydownForHashField();
  deleteEscKeydownForTextField();
};

//Функция закрытия фото
const closeFormOverlay = () => {
  updateForm.reset();
  //resetScale();
  //resetEffects();
  pristine.reset();
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

// Закрываем модалку-редактор по кнопке
function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormOverlay();
  }
}

/*----- ВАЛИДАЦИЯ -----*/

//Валидация других требований к хэштегу
const isValidTag = (tag) => HASH_TAG.test(tag);

//Валидация хэштегов
const validateTagsLength = (tags) => tags.length <= MAX_COUNT_HASTAGS;

//Валидация уникальности хэштегов
const validateUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

//
const validateTags = (value) => {
  if (value === undefined || value.length === 0) {
    return true;
  }
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validateTagsLength(tags) && validateUniqueTags(tags) && tags.every(isValidTag);
};

//Функция по валидации длины комментариев
const validateCommentsField = (value) => value.length <= MAX_COMMENTS_LENGTH;

//Описание валидации хэштегов
pristine.addValidator(
  hashtagField, // Элемент валидации
  validateTags, //функция проверки
  ERROR_HASHTAG_MESSAGE //Сообщение об ошибке
);

//Описание валидации комментариев
pristine.addValidator(
  commentField,
  validateCommentsField,
  ERROR_COMMENTS_MESSAGE
);

//
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

inputUploadFile.addEventListener('change', openFormOverlay);
overlayCloseButtonForm.addEventListener('click', closeFormOverlay);
updateForm.addEventListener('submit', onFormSubmit);
