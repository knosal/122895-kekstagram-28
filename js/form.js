import { isEscapeKey } from './util.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
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
  classTo: 'img-upload__field-wrapper', // Элемент на который будут добавляется служебные классы
  errorTextParent: 'img-upload__field-wrapper', // Класс для элемента в котором будет вывод ошибки
  errorTextClass: 'img-upload__field-wrapper__error', // текст ошибки
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
  updateForm.reset(); //сбрасываем данные формы
  //resetScale(); //сбрасываем масштаб
  //resetEffects(); //сбрасываем эффекты
  pristine.reset(); //сбрасываем показ ошибок
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

//Валидация требований к хэштегу в соответствии регулярному выражению
const isValidTag = (tag) => HASHTAG_PATTERN.test(tag);

//Валидация количества хэштегов
const validateTagsLength = (tags) => tags.length <= MAX_COUNT_HASTAGS;

//Валидация уникальности хэштегов
const validateUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

//Валидация
const validateTags = (value) => {
  if (value === undefined || value.length === 0) {
    return true;
  }
  const tags = value // Хранилище готовых ХешТегов
    .trim() //удаляет пробелы и с начала и с конца
    .split(' ') //разделяет строку и возвращает массив из полученных подстрок
    .filter((tag) => tag.trim().length); //Проверяем чтобы не было лишних пробелов
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

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

inputUploadFile.addEventListener('change', openFormOverlay);
overlayCloseButtonForm.addEventListener('click', closeFormOverlay);
updateForm.addEventListener('submit', onFormSubmit);
