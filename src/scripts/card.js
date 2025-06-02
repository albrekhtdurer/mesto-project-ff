const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

/**
 * @function renderCard - создает готовый к выводу элемент карточки
 * @param   {{name: string, link: string}} cardData   данные карточки
 * @param   {function}                     deleteFunc функция удаления карточки
 * @returns {HTMLElement}                             элемент карточки
 */
export function renderCard(cardData, deleteFunc) {
  if (typeof cardData !== 'object' || !cardData.name || !cardData.link) {
    return;
  }
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.name;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);
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


export function addCardsOnPage(cards) {
  cards.forEach(function (card) {
  const renderedCard = renderCard(card, deleteCard);
  if (renderedCard) {
    cardsList.append(renderedCard);
  }
})
};
