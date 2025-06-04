const cardTemplate = document.querySelector('#card-template').content;

const displayedCards = document.querySelector('.places__list');

/**
 * @function renderCard - создает готовый к выводу элемент карточки
 * @param   {{name: string, link: string}} cardData   данные карточки
 * @param   {function}                     deleteFunc функция удаления карточки
 * @param   {function}                     likeFunc   функция проставления лайка
 * @returns {HTMLElement}                             элемент карточки
 */
export function renderCard(cardData, deleteFunc, likeFunc) {
  if (typeof cardData !== 'object' || !cardData.name || !cardData.link) {
    return;
  }
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.name;
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

export function addLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function addCardOnPage(card, position) {
  console.log('tralalero tralala');
  const renderedCard = renderCard(card, deleteCard, addLike);
  if (position === 'start') {
    displayedCards.prepend(renderedCard);
  } else if (position === 'end') {
    displayedCards.append(renderedCard);
  }
}

