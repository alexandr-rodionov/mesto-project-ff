import { deleteCard, putLike, deleteLike } from './api.js';

// Card template

const cardTemplate = document.querySelector('#card-template').content;

// Card creation

export function createCard(element, removeCallback, likeCallback, clickImageCallback, userId) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-count');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardLikeCount.textContent = element.likes.length;

  if (userId !== element.owner._id) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => removeCallback(card, element._id));
  }

  if (element.likes.map(user => user._id).includes(userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', e => likeCallback(e, element._id, cardLikeCount));

  cardImage.addEventListener('click', clickImageCallback);

  return card;
};

// Card removing

export function removeCard(card, cardId) {
  deleteCard(cardId)
    .then(card.remove())
    .catch(err => console.log(err));
};

// Card like switching

export function likeCard(like, cardId, cardLikeCount) {
  if (!like.target.classList.contains('card__like-button_is-active')) {
    putLike(cardId)
      .then(res => {
        like.target.classList.add('card__like-button_is-active');
        cardLikeCount.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  } else {
    deleteLike(cardId)
      .then(res => {
        like.target.classList.remove('card__like-button_is-active');
        cardLikeCount.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  }
};

