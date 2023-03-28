const thumbnailGalleryElement = document.querySelector('.pictures'); // секция для отображения фотографий
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция отрисовки фотографий в галлереи
const createTemplateList = (createTemplates) => {
  const listFragment = document.createDocumentFragment();

  createTemplates.forEach(({ url, description, likes, comments }) => {
    const templateElement = templateFragment.cloneNode(true);
    templateElement.querySelector('.picture__img').src = url;
    templateElement.querySelector('.picture__img').alt = description;
    templateElement.querySelector('.picture__likes').textContent = likes;
    templateElement.querySelector('.picture__comments').textContent = comments.length;
    listFragment.append(templateElement);
  });

  thumbnailGalleryElement.append(listFragment);
};

export { createTemplateList };
