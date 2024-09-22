// Card template

const cardTemplate = document.querySelector('#card-template').content;

// Card creation

export function createCard(srcValue, titleValue, removeCallback, likeCallback, clickImageCallback) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = srcValue;
  cardImage.alt = titleValue;
  cardTitle.textContent = titleValue;

  card.querySelector('.card__delete-button').addEventListener('click', () => { removeCallback(card); });
  card.querySelector('.card__like-button').addEventListener('click', likeCallback);
  cardImage.addEventListener('click', clickImageCallback);

  return card;
};

// Card removing

export function removeCard(card) {
  card.remove();
};

// Card like switching

export function likeCard(like) {
  like.target.classList.toggle('card__like-button_is-active');
};

