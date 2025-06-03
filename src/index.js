import {renderCard, deleteCard, addCardsOnPage} from './scripts/card'
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

addCardsOnPage(initialCards);

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
//TODO: переименовать тут по шаблону (?) и подумать про модуль
const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements['name'];
const formEditDescription = formEdit.elements.description;
const currentName = document.querySelector('.profile__title').textContent;
const currentDescription = document.querySelector('.profile__description').textContent;
formEditName.value = currentName;
formEditDescription.value = currentDescription;

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = formEditName.value;
  document.querySelector('.profile__description').textContent = formEditDescription.value;
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormSubmit); 


buttonEdit.addEventListener('click', function() {
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', function() {
  openModal(popupAdd);
});

closeButtons.forEach(button => {
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
