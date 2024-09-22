import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup } from './popup.js';

// DOM nodes

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileName = content.querySelector('.profile__title');
const openPopupEditProfileButton = content.querySelector('.profile__edit-button');
const profileActivity = content.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup_type_edit');
const closePopupEditProfileButton = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const inputNameFormEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const inputActivityFormEditProfile = formEditProfile.querySelector('.popup__input_type_description');

const openPopupNewCardButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closePopupNewCardButton = popupNewCard.querySelector('.popup__close');
const formNewPlace = popupNewCard.querySelector('.popup__form');

const popupImage = document.querySelector('.popup_type_image');
const closePopupImage = popupImage.querySelector('.popup__close');

// Handle submit

function handleEditProfileFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = inputNameFormEditProfile.value;
  profileActivity.textContent = inputActivityFormEditProfile.value;

  closePopup(popupEditProfile);
};

function handleNewPlaceFormSubmit(e) {
  e.preventDefault();

  let nameCard = formNewPlace.querySelector('.popup__input_type_card-name');
  let linkCard = formNewPlace.querySelector('.popup__input_type_url');

  placesList.prepend(createCard(linkCard.value, nameCard.value, removeCard, likeCard, openPopupImage));

  closePopup(popupNewCard);
  formNewPlace.reset();
};

// Popup image

function openPopupImage() {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');

  image.src = this.src;
  image.alt = this.alt;
  caption.textContent = this.alt;

  openPopup(popupImage);
};

// Edit profile

openPopupEditProfileButton.addEventListener('click', () => {
  inputNameFormEditProfile.value = profileName.textContent;
  inputActivityFormEditProfile.value = profileActivity.textContent;

  openPopup(popupEditProfile);
});

closePopupEditProfileButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// New card

openPopupNewCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

closePopupNewCardButton.addEventListener('click', () => {
  closePopup(popupNewCard);
});

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

// Image card

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

// Initializing cards from array

initialCards.forEach(item => {
  placesList.append(createCard(item.link, item.name, removeCard, likeCard, openPopupImage));
});