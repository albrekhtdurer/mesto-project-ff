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
