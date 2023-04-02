import { isEscapeKey } from './util.js';

const inputUploadFile = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const overlayCloseButtonForm = document.querySelector('#upload-cancel');
const updateForm = document.querySelector('.img-upload__form');

/*----- ФОРМА -----*/
// Функция открытия окна при нажатии фото
const openFormOverlay = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

//Функция по закрытию загруженного фото в редакторе
const closeFormOverlay = () => {
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
//Создание экземплятор валидатора и передача в него элемента формы.
const pristine = new Pristine(updateForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

inputUploadFile.addEventListener('change', openFormOverlay);
overlayCloseButtonForm.addEventListener('click', closeFormOverlay);
updateForm.addEventListener('submit', onFormSubmit);
