import { renderCard, deleteCard, toggleLikeButton } from './scripts/card';
import { initialCards } from './scripts/cards';
import { closeModal, openModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import { getCurrentUser, getInitialCards, editUserProfile } from './scripts/api';

import './pages/index.css';

import addIcon from './images/add-icon.svg';
import avatar from './images/avatar.jpg';
import card_1 from './images/card_1.jpg';
import card_2 from './images/card_2.jpg';
import card_3 from './images/card_3.jpg';
import close from './images/close.svg';
import deleteIcon from './images/delete-icon.svg';
import editIcon from './images/edit-icon.svg';
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';
import logo from './images/logo.svg';

const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupTitle = cardPopup.querySelector('.popup__caption');

const displayedCards = document.querySelector('.places__list');

const formEdit = document.forms['edit-profile'];
const formEditName = formEdit.elements['name'];
const formEditDescription = formEdit.elements['description'];
const validationConfigEdit = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popupEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');

const formAdd = document.forms['new-place'];
const formAddPlaceName = formAdd.elements['place-name'];
const formAddLink = formAdd.elements['link'];
const validationConfigAdd = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputTextsToClear: ['place', 'link'],
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

const popupAdd = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');

const popups = [popupAdd, popupEdit, cardPopup];

/**
 * @function createCardPopup - рендерит попап с изображением карточки
 * @param {Event} evt эвент события
 */
function createCardPopup(evt) {
  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = evt.target.alt;
  cardPopupTitle.textContent = evt.target.alt;
}

/**
 * @function addCardOnPage - добавляет карточку на страницу
 * @param {HTMLElement} card           DOM-элемент карточки
 * @param {string}      position       добавлять карточку в начало или конец контейнера
 * @param {HTMLElement} displayedCards контейнер с карточками
 */
function addCardOnPage(card, position, displayedCards) {
  if (position === 'start') {
    displayedCards.prepend(card);
  } else if (position === 'end') {
    displayedCards.append(card);
  }
}

displayedCards.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(cardPopup);
  }
});

initialCards.forEach(function (card) {
  const renderedCard = renderCard(
    card,
    deleteCard,
    toggleLikeButton,
    createCardPopup
  );
  addCardOnPage(renderedCard, 'end', displayedCards);
});

//TODO: когда появятся новые карточки, грохнуть старые
Promise.all([getCurrentUser(), getInitialCards()])
  .then((results) => {
    const [currentUser, newInitialCards] = results;
    if (currentUser.name) {
      profileTitle.textContent = currentUser.name;
    }
    if (currentUser.about) {
      profileDescription.textContent = currentUser.about;
    }
    if (currentUser.avatar) {
      profileImage.style.backgroundImage = `url(${currentUser.avatar})`;
    }
    newInitialCards.forEach(function (card) {
      const renderedCard = renderCard(
        card,
        deleteCard,
        toggleLikeButton,
        createCardPopup
      );
      addCardOnPage(renderedCard, 'end', displayedCards);
    });
  })
  .catch((err) => {
    console.log(err);
  });


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  editUserProfile(formEditName.value, formEditDescription.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;    
    })
    .catch((err) => {
      console.log(err);
    })
  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit);

buttonEdit.addEventListener('click', function () {
  const currentName = profileTitle.textContent;
  const currentDescription = profileDescription.textContent;
  formEditName.value = currentName;
  formEditDescription.value = currentDescription;
  clearValidation(formEdit, validationConfigEdit);
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', function () {
  clearValidation(formAdd, validationConfigAdd);
  openModal(popupAdd);
});

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: formAddPlaceName.value, link: formAddLink.value };
  const renderedCard = renderCard(
    cardData,
    deleteCard,
    toggleLikeButton,
    createCardPopup
  );
  addCardOnPage(renderedCard, 'start', displayedCards);
  formAdd.reset();
  closeModal(popupAdd);
}

formAdd.addEventListener('submit', handleFormAddSubmit);

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (
      evt.target.classList.contains('popup_is-opened') ||
      evt.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
  });
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
