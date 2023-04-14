const thumbnailContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция перерисовки картинок
const redrawingThumbnail = () => {
  const thumbnailAllinContainer = thumbnailContainer.querySelectorAll('.picture');
  thumbnailAllinContainer.forEach((element) => element.remove()); //Заново отрисовываем все изображения
};

// Функция создания элемента-картинки
const createThumbnail = (({ url, description, likes, comments, id }) => {
  const template = templateFragment.cloneNode(true);
  template.querySelector('.picture__img').src = url;
  template.querySelector('.picture__img').alt = description;
  template.querySelector('.picture__likes').textContent = likes;
  template.querySelector('.picture__comments').textContent = comments.length;
  template.dataset.thumbnailId = id;
  return template;
});

// Функция отрисовки фотографий в галлереи
const renderThumbnail = (dataThumbnail) => {
  const listFragment = document.createDocumentFragment();
  dataThumbnail.forEach((element) => listFragment.append(element));
  thumbnailContainer.append(listFragment); //отрисовка списка
  thumbnailContainer.classList.remove('hidden');
};

// Функция активации сборки
const createTemplateList = (dataThumbnail) => {
  redrawingThumbnail();
  const templateElements = dataThumbnail.map((picture) => createThumbnail(picture));
  renderThumbnail(templateElements);
};

export { createTemplateList };
