
import { isEscapeKey } from './util.js';
import './thumbnail.js';

const userModalElement = document.querySelector('.big-picture');
//const userModalOpenElement = document.querySelectorAll('.picture');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
/*
userModalOpenElement.addEventListener('click', () => {
  userModalElement.classList.remove('hidden');
});
*/
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
  }
});

userModalCloseElement.addEventListener('click', () => {
  userModalElement.classList.add('hidden');
});
