const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '6418e88d-1b25-4280-aade-2574b4ca96d8',
    'Content-Type': 'application/json'
  }
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(status);
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(status);
};

export const patchProfile = (profileName, profileActivity) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: profileName,
      about: profileActivity
    })
  })
    .then(status);
};

export const postCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .then(status);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(status);
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  })
    .then(status);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(status);
};

export const patchAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(status);
};

const status = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};