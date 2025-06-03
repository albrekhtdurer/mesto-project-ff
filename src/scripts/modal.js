export function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  console.log('tralaal');
  popup.classList.remove('popup_is-opened');
}