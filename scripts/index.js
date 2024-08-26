// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// Функция создания карточки

function createCard(srcValue, titleValue, callback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = srcValue;
  cardImage.alt = titleValue;
  cardElement.querySelector('.card__title').textContent = titleValue;

  cardElement.querySelector('.card__delete-button').addEventListener('click', e => {
    callback(e.target.parentElement);
  });

  placesList.append(cardElement);
}

// Функция удаления карточки

function removeCard(target) {
  target.remove();
}

// Вывести карточки на страницу

initialCards.forEach(item => {
  createCard(item.link, item.name, removeCard);
});