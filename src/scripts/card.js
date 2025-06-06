/**
 * @function renderCard - создает готовый к выводу элемент карточки
 * @param   {{name: string, link: string}} cardData              данные карточки
 * @param   {function}                     deleteFunc            функция удаления карточки
 * @param   {function}                     likeFunc              функция проставления лайка
 * @param   {function}                     createCardPopupFunc   функция рендеринга попап-окна с карточкой
 * @returns {HTMLElement}                             элемент карточки
 */
export function renderCard(
  cardData,
  deleteFunc,
  likeFunc,
  createCardPopupFunc
) {
  if (typeof cardData !== 'object' || !cardData.name || !cardData.link) {
    return;
  }
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', createCardPopupFunc);
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeFunc);
  return card;
}

/**
 * @function deleteCard - удаляет карточку со страницы
 * @param {Event} evt эвент события
 */
export function deleteCard(evt) {
  const cardToDelete = evt.currentTarget.closest('.card');
  cardToDelete.remove();
}

/**
 * @function toggleLikeButton - меняет состояние кнопки лайка
 * @param {Event} evt эвент события
 */
export function toggleLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
