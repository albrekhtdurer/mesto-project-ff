import {
  renderCard,
  deleteCardFromPage,
  toggleLikeButton,
} from './scripts/card';
import { closeModal, openModal } from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/validation';
import {
  getCurrentUser,
  getInitialCards,
  editUserProfile,
  createCard,
  deleteCard,
  addLike,
  removeLike,
  editAvatar,
  validateAvatarLink,
} from './scripts/api';

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
const buttonEditSubmit = formEdit.querySelector('.popup__button');

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
const buttonAddSubmit = formAdd.querySelector('.popup__button');

const formAvatar = document.forms['edit-avatar'];
const formAvatarUrl = formAvatar.elements['avatar-url'];
const validationConfigAvatar = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputTextsToClear: ['avatar-url'],
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

const popupAvatar = document.querySelector('.popup_type_edit_avatar');
const buttonAvatarSubmit = formAvatar.querySelector('.popup__button');

const popupError = document.querySelector('.popup_type_error');
const popupErrorButton = popupError.querySelector('.popup__button');
popupErrorButton.addEventListener('click', () => {
  closeModal(popupError);
});
const popupErrorText = popupError.querySelector('.popup__text');

const popupConfirmDelete = document.querySelector('.popup_type_confirm_delete');
const buttonConfirmDeleteSubmit =
  popupConfirmDelete.querySelector('.popup__button');
const buttonConfirmDeleteSubmitText = buttonConfirmDeleteSubmit.textContent;

const popups = [
  popupAdd,
  popupEdit,
  cardPopup,
  popupAvatar,
  popupError,
  popupConfirmDelete,
];

let currentUserId;
let cardToDelete;
let cardToDeleteId;

function renderLoadingButton(button, buttonText) {
  button.textContent = buttonText;
}

function renderErrorPopup(err) {
  popupErrorText.textContent = err;
  openModal(popupError);
}

/**
 * @function createCardPopup - рендерит попап с изображением карточки
 * @param {Event} evt эвент события
 */
function createCardPopup(evt) {
  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = evt.target.alt;
  cardPopupTitle.textContent = evt.target.alt;
}

function handleCardImageClick(evt) {
  createCardPopup(evt);
  openModal(cardPopup);
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

function handleCardDelete(evt) {
  renderLoadingButton(buttonConfirmDeleteSubmit, 'Удаление...');
  evt.preventDefault();
  deleteCard(cardToDeleteId)
  .then(() => {
      deleteCardFromPage(cardToDelete);
      closeModal(popupConfirmDelete);
    })
    .catch((err) => {
      renderErrorPopup(err);
    })
    .finally(() => {
      renderLoadingButton(
        buttonConfirmDeleteSubmit,
        buttonConfirmDeleteSubmitText
      );
    });
}

function handleDeleteButtonClick(card, cardId) {
  cardToDelete = card;
  cardToDeleteId = cardId;
  console.log(cardToDeleteId);
  openModal(popupConfirmDelete);
  buttonConfirmDeleteSubmit.addEventListener('click', handleCardDelete);
}

function handleLike(evt) {
  const currentCard = evt.currentTarget.closest('.card');
  const id = currentCard.id;
  const funcToHandleLike = evt.currentTarget.classList.contains(
    'card__like-button_is-active'
  )
    ? removeLike
    : addLike;
  funcToHandleLike(id)
    .then((res) => {
      const cardLikes = currentCard.querySelector('.card__likes');
      if (res.likes.length > 0) {
        cardLikes.textContent = res.likes.length;
      } else if (res.likes.length === 0) {
        cardLikes.remove();
      }
      toggleLikeButton(evt);
    })
    .catch((err) => {
      renderErrorPopup(err);
    });
}

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
    currentUserId = currentUser._id;
    newInitialCards.forEach(function (card) {
      const renderedCard = renderCard(
        card,
        handleDeleteButtonClick,
        handleLike,
        handleCardImageClick,
        currentUserId
      );
      addCardOnPage(renderedCard, 'end', displayedCards);
    });
  })
  .catch((err) => {
    renderErrorPopup(err);
  });

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const buttonEditSubmitText = buttonEditSubmit.textContent;
  renderLoadingButton(buttonEditSubmit, 'Сохранение...');
  editUserProfile(formEditName.value, formEditDescription.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      renderErrorPopup(err);
    })
    .finally(() => {
      renderLoadingButton(buttonEditSubmit, buttonEditSubmitText);
    });
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
  const buttonAddSubmitText = buttonAddSubmit.textContent;
  renderLoadingButton(buttonAddSubmit, 'Сохранение...');
  createCard(formAddPlaceName.value, formAddLink.value)
    .then((result) => {
      const cardData = result;
      const renderedCard = renderCard(
        cardData,
        handleDeleteButtonClick,
        handleLike,
        handleCardImageClick,
        currentUserId
      );
      addCardOnPage(renderedCard, 'start', displayedCards);
      formAdd.reset();
      closeModal(popupAdd);
    })
    .catch((err) => {
      renderErrorPopup(err);
    })
    .finally(() => {
      renderLoadingButton(buttonAddSubmit, buttonAddSubmitText);
    });
}

formAdd.addEventListener('submit', handleFormAddSubmit);

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const buttonAvatarSubmitText = buttonAvatarSubmit.textContent;
  renderLoadingButton(buttonAvatarSubmit, 'Сохранение...');
  validateAvatarLink(formAvatarUrl.value)
    .then((res) => {
      if (res.startsWith('image/')) {
        editAvatar(formAvatarUrl.value)
          .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            formAvatar.reset();
            closeModal(popupAvatar);
          })
          .catch((err) => {
            renderErrorPopup(err);
          });
      }
    })
    .catch((err) => {
      renderErrorPopup(err);
    })
    .finally(() => {
      renderLoadingButton(buttonAvatarSubmit, buttonAvatarSubmitText);
    });
}

formAvatar.addEventListener('submit', handleAvatarSubmit);

profileImage.addEventListener('click', function () {
  clearValidation(formAvatar, validationConfigAvatar);
  openModal(popupAvatar);
});

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (
      evt.target.classList.contains('popup_is-opened') ||
      evt.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup_type_confirm_delete')) {
      buttonConfirmDeleteSubmit.removeEventListener('click', handleCardDelete);
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
