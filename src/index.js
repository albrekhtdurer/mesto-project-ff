import { renderCard, deleteCard, toggleLikeButton, createCardPopup, addCardOnPage } from './scripts/card'
import { initialCards } from './scripts/cards'
import { closeModal, openModal } from './scripts/modal'

import './pages/index.css'

import addIcon from './images/add-icon.svg'
import avatar from './images/avatar.jpg'
import card_1 from './images/card_1.jpg'
import card_2 from './images/card_2.jpg'
import card_3 from './images/card_3.jpg'
import close from './images/close.svg'
import deleteIcon from './images/delete-icon.svg'
import editIcon from './images/edit-icon.svg'
import likeActive from './images/like-active.svg'
import likeInactive from './images/like-inactive.svg'
import logo from './images/logo.svg'

const displayedCards = document.querySelector('.places__list');

initialCards.forEach(function(card) {
  const renderedCard = renderCard(card, deleteCard, toggleLikeButton, createCardPopup);
  addCardOnPage(renderedCard, 'end', displayedCards);
});

const popupEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');

buttonEdit.addEventListener('click', function() {
  openModal(popupEdit);
});

const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');

buttonAdd.addEventListener('click', function() {
  openModal(popupAdd);
});

const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements['name'];
const formEditDescription = formEdit.elements['description'];
const currentName = document.querySelector('.profile__title').textContent;
const currentDescription = document.querySelector('.profile__description').textContent;
formEditName.value = currentName;
formEditDescription.value = currentDescription;

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = formEditName.value;
  document.querySelector('.profile__description').textContent = formEditDescription.value;
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit);

const formAdd = document.forms['new-place'];
const inputPlaceName = formAdd.elements['place-name'];
const inputLink = formAdd.elements['link'];

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const cardData = {name: inputPlaceName.value, link: inputLink.value};
  const renderedCard = renderCard(cardData, deleteCard, toggleLikeButton, createCardPopup);
  addCardOnPage(renderedCard, 'start', displayedCards);
  formAdd.reset();
  closeModal(popupAdd);
}

formAdd.addEventListener('submit', handleFormAddSubmit);
