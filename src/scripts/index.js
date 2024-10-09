import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup } from './popup.js';
import { enableValidation, clearValidation } from './validation.js';
import { getProfile, getCards, patchProfile, postCard, patchAvatar} from './api.js';

// DOM nodes

let userId;

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const profileImage = content.querySelector('.profile__image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const closePopupEditAvatarButton = popupEditAvatar.querySelector('.popup__close');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Handle submit

function handleEditAvatarFormSubmit(e) {
  e.preventDefault();

  const avatarLink = popupEditAvatar.querySelector('.popup__input_type_url');

  patchAvatar(avatarLink.value)
   .then(res => {
    profileImage.style.backgroundImage = `url(${res.avatar})`;
    closePopup(popupEditAvatar);
    clearValidation(popupEditAvatar, validationConfig)
    formEditAvatar.reset();
   })
   .catch(err => console.log(err));
};

function handleEditProfileFormSubmit(e) {
  e.preventDefault();

  patchProfile(inputNameFormEditProfile.value, inputActivityFormEditProfile.value)
   .then(res => {
    updateProfileInfo(res);
    closePopup(popupEditProfile);
   })
   .catch(err => console.log(err));
};

function handleNewPlaceFormSubmit(e) {
  e.preventDefault();

  const cardName = formNewPlace.querySelector('.popup__input_type_card-name');
  const cardLink = formNewPlace.querySelector('.popup__input_type_url');

  postCard(cardName.value, cardLink.value)
    .then(res => {
      placesList.prepend(createCard(res, removeCard, likeCard, openPopupImage, userId));
      closePopup(popupNewCard);
      clearValidation(popupNewCard, validationConfig)
      formNewPlace.reset();
    })
    .catch(err => console.log(err));
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

profileImage.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});

closePopupEditAvatarButton.addEventListener('click', () => {
  closePopup(popupEditAvatar);
});

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

openPopupEditProfileButton.addEventListener('click', () => {
  inputNameFormEditProfile.value = profileName.textContent;
  inputActivityFormEditProfile.value = profileActivity.textContent;
  clearValidation(popupEditProfile, validationConfig);
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

// Update profile information

const updateProfileInfo = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileActivity.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

// Get requsts

Promise.all([getProfile(), getCards()])
  .then(([userInfo, cardInfo]) => {
    userId = userInfo._id;
    updateProfileInfo(userInfo);
    cardInfo.forEach(item => {
      placesList.append(createCard(item, removeCard, likeCard, openPopupImage, userId));
    });
  })
  .catch(err => console.error(err));

// Validation form

enableValidation(validationConfig);
