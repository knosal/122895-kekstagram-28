import { createPhotos } from './setup.js';
import { renderGallery } from './modal.js';
import './form.js';
import './validate.js';
import './scale.js';
import './effects.js';

renderGallery(createPhotos());

/*
import { closeFormOverlay } from './form'; //Функция закрытия фото
import { setUserFormSubmit } from './validate'; //
import { renderGallery } from './modal.js'; // Функция добавления вспомогательной информации к фотографиям
import { getData } from './load.js'; //
import { showAlert } from './util.js'; // Функция показывает окно при ошибке во время отправки фото
import './form.js';
import './validate.js';
import './scale.js';
import './effects.js';

getData()
.then((dataPictures) => {
  renderPhotos(dataPictures.slice(0, PHOTOS_OBJECTS_COUNT));
})
.catch((err) => {
  showAlert(err.message);
});

setUserFormSubmit(closeFormOverlay);
*/
