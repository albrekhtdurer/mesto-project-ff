import {renderCard, deleteCard, addCardOnPage} from './scripts/card'
import {initialCards} from './scripts/cards'
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

initialCards.forEach(function(card) {
  addCardOnPage(card, 'end');
})

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
//TODO: переименовать тут по шаблону (?) и подумать про модуль
const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements['name'];
const formEditDescription = formEdit.elements['description'];
const currentName = document.querySelector('.profile__title').textContent;
const currentDescription = document.querySelector('.profile__description').textContent;
formEditName.value = currentName;
formEditDescription.value = currentDescription;
const formAdd = document.forms['new-place'];
const inputPlaceName = formAdd.elements['place-name'];
const inputLink = formAdd.elements['link'];


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = formEditName.value;
  document.querySelector('.profile__description').textContent = formEditDescription.value;
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit);

formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardData = {name: inputPlaceName.value, link: inputLink.value};
  addCardOnPage(cardData, 'start');
  formAdd.reset();
  closeModal(popupAdd);
});

buttonEdit.addEventListener('click', function() {
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', function() {
  openModal(popupAdd);
});

closeButtons.forEach(function(button) {
  button.addEventListener('click', function(evt) {
    const popupToClose = evt.target.closest('.popup_is-opened');
    closeModal(popupToClose);
  });
});

popupEdit.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
});

popupAdd.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
});
