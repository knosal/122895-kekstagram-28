// Время длительности показа сообщения
const ALERT_SHOW_TIME = 5000;
// Время задержки перед повторной отправкой
const RESENDING_DELAY = 500;

// Функция для проверки клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция показывает окно при ошибке во время отправки фото
const showErorMesage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('show-error-message');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.lineHeight = 'normal';
  alertContainer.style.opacity = '0.8';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция для устранения дребезга (многократного повторения действий "клика")
const debounce = (callback, timeoutDelay = RESENDING_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {
  isEscapeKey,
  showErorMesage,
  debounce
};
