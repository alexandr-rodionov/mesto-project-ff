// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// Функция создания карточки

function createCard(srcValue, titleValue, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = srcValue;
  cardImage.alt = titleValue;
  cardElement.querySelector('.card__title').textContent = titleValue;

  cardElement.querySelector('.card__delete-button').addEventListener('click', e => {
    deleteCard(e.target);
  });

  placesList.append(cardElement);
}

// Функция удаления карточки

function removeCard(cardElement) {
  const card = cardElement.closest('.card')
  card.remove();
}

// Вывести карточки на страницу

initialCards.forEach(item => {
  createCard(item.link, item.name, removeCard);
});