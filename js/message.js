import { onModalEscKeydown } from './form.js'; //Функция закрытия модального окна

const errorMessageTemplate = document.querySelector('#error');
const successMessageTemplate = document.querySelector('#success');

//Функция для определения типа сообщения, которое необходимо закрыть
const getMessages = () => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  return { error, success };
};

//Функция закрытия сообщения
const closeMessage = () => {
  const message = getMessages();
  if (message) {
    message.remove();
  }

  document.removeEventListener('click', onClickArbitraryArea);
  document.removeEventListener('keydown', onModalEscKeydown);
};

/*
const getMessages = () => document.querySelector('.error, .success');

const closeMessage = () => {
  const messageType = getMessages();
  if (messageType) {
    messageType.remove();
  }

  document.removeEventListener('click', onClickArbitraryArea);
  document.removeEventListener('keydown', onModalEscKeydown);
};*/

//Функция закрытия модального окна сообщения
function onClickArbitraryArea(evt) {
  if (!evt.target.closest('.error') || (!evt.target.closest('.success'))) {
    closeMessage();
  }
}
/*
// Закрытие сообщения об ошибке
const errorTypeMessage = getMessages().error;
closeMessage(errorTypeMessage);

// Закрытие сообщения об успехе
const successTypeMessage = getMessages().success;
closeMessage(successTypeMessage);
*/

//Функция отображения сообщения об успешном выполнении
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.innerHTML; //Меняем содержимое новым
  document.body.insertAdjacentHTML('beforeend', successMessage); //Добавляем сообщение перед body
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onClickArbitraryArea);
};

//Функция отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', errorMessage);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onClickArbitraryArea);
};

export { getMessages, showSuccessMessage, showErrorMessage, closeMessage };
