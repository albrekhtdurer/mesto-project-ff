/* JS */
import {renderCard, deleteCard, addCardsOnPage} from './scripts/card'
import {initialCards} from './scripts/cards'
import { closeModal, openModal } from './scripts/modal'

/* CSS */
import './pages/index.css'

/* Изображения */
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
})