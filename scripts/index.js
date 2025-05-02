const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

function renderCard(cardData, deleteFunc) {
  if (typeof cardData !== 'object' || !cardData.name || !cardData.link) {
    return;
  }
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__image').src = cardData.link;
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.currentTarget.closest('.card');
  cardToDelete.remove();
}

initialCards.forEach(function(card) {
  const renderedCard = renderCard(card, deleteCard);
  if (renderedCard) {
    cardsList.append(renderedCard);
  }
});
