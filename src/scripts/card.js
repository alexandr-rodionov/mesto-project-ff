import { reqPutLike, reqDeleteLike } from './api.js';

// Card template

const cardTemplate = document.querySelector('#card-template').content;

// Card creation

export const createCard = (element, removeCallback, likeCallback, clickImageCallback, userId) => {
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
  }

  if (element.likes.map(user => user._id).includes(userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => removeCallback(card, element._id));
  cardLikeButton.addEventListener('click', e => likeCallback(e, element._id, cardLikeCount));
  cardImage.addEventListener('click', clickImageCallback);

  return card;
};

// Card like switching

export const likeCard = (like, cardId, cardLikeCount) => {
  if (!like.target.classList.contains('card__like-button_is-active')) {
    reqPutLike(cardId)
      .then(res => {
        like.target.classList.add('card__like-button_is-active');
        cardLikeCount.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  } else {
    reqDeleteLike(cardId)
      .then(res => {
        like.target.classList.remove('card__like-button_is-active');
        cardLikeCount.textContent = res.likes.length;
      })
      .catch(err => console.error(err));
  }
};

