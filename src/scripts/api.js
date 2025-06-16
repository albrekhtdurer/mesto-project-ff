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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  const url = getFullUrl('/cards');
  return fetch(url, {
    method: 'GET',
    headers: config.headers
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const editUserProfile = (name, desciprtion) => {
  const url = getFullUrl('/users/me');
  return fetch(url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: desciprtion
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const createCard = (name, link) => {
  const url = getFullUrl('/cards');
  return fetch(url, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
  const url = getFullUrl(`/cards/${cardId}`);
  return fetch(url, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return Promise.reject(`ОШибка: ${res.status}`);
    })
}