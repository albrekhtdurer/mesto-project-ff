import {checkResponse} from './utils';

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: 'fac52df7-7355-4929-9fc5-993340251a1d',
    'Content-Type': 'application/json',
  },
};

function getFullUrl(urlPart) {
  return config.baseUrl + urlPart;
}

export const getCurrentUser = () => {
  const url = getFullUrl('/users/me');
  return fetch(url, {
    method: 'GET',
    headers: config.headers,
  }).then(checkResponse);
};

export const getInitialCards = () => {
  const url = getFullUrl('/cards');
  return fetch(url, {
    method: 'GET',
    headers: config.headers,
  }).then(checkResponse);
};

export const editUserProfile = (name, desciprtion) => {
  const url = getFullUrl('/users/me');
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: desciprtion,
    }),
  }).then(checkResponse);
};

export const createCard = (name, link) => {
  const url = getFullUrl('/cards');
  return fetch(url, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

export const deleteCard = (cardId) => {
  const url = getFullUrl(`/cards/${cardId}`);
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return true;
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};

export const addLike = (cardId) => {
  const url = getFullUrl(`/cards/likes/${cardId}`);
  return fetch(url, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
};

export const removeLike = (cardId) => {
  const url = getFullUrl(`/cards/likes/${cardId}`);
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
};

export const validateAvatarLink = (avatarLink) => {
  return fetch(avatarLink, {
    method: 'HEAD',
  }).then((res) => {
    if (res.ok) {
      return res.headers.get('content-type');
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};

export const editAvatar = (avatarLink) => {
  const url = getFullUrl('/users/me/avatar');
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
};
