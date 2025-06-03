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
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');

editButton.addEventListener('click', function() {
  openModal(popupEdit);
});

closeButton.addEventListener('click', function(evt) {
  const popupToClose = evt.target.closest('.popup_is-opened');
  closeModal(popupToClose);
});