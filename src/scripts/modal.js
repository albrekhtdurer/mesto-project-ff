/**
 * @function openModal - открывает попап
 * @param {HTMLElement} popup HTML-элемент попапа, который нужно открыть
 */

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', function(evt) {
      if(evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
      }
  });
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', function() {
    closeModal(popup);
  });
  document.addEventListener('keydown', handleEscape);
  
}

/**
 * @function closeModal - закрывает попап
 * @param {HTMLElement} popup HTML-элемент попапа, который нужно закрыть
 */
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

/**
 * @function handleEscape - закрывает открытый попап при нажатии кнопки Escape
 * @param {Event} evt эвент события
 */

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}