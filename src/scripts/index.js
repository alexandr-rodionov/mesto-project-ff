import '../pages/index.css';
import { createCard, likeCard } from './card.js';
import { openPopup, closePopup } from './popup.js';
import { enableValidation, clearValidation } from './validation.js';
import { reqGetProfile, reqGetCards, reqPatchProfile, reqPostCard, reqPatchAvatar, reqDeleteCard} from './api.js';
import { showPreloader, removePreloader, changeSubmitButtonText, preloadBlur } from './improvedUX.js';


// DOM nodes

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

const popupConfirm = document.querySelector('.popup_type_confirm');
const closePopupConfirm = popupConfirm.querySelector('.popup__close');
const formConfirm = popupConfirm.querySelector('.popup__form');

// For preaload

const places = content.querySelector('.places');
const preloadElement = document.createElement('div');
const listBlur = [
  profileImage,
  profileName,
  profileActivity
];

// User ID

let userId;

// Validation configuration

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Update profile

const updateProfileInfo = (userInfo) => {
  profileName.textContent = userInfo.name;
  profileActivity.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

// Avatar

const handleEditAvatarFormSubmit = e => {
  e.preventDefault();

  changeSubmitButtonText(popupEditAvatar, "Сохранение...");

  const avatarLink = popupEditAvatar.querySelector('.popup__input_type_url');

  reqPatchAvatar(avatarLink.value)
   .then(res => {
     profileImage.style.backgroundImage = `url(${res.avatar})`;
     closePopup(popupEditAvatar);
     formEditAvatar.reset();
     clearValidation(popupEditAvatar, validationConfig);
   })
   .catch(err => console.error(err))
   .finally(() => changeSubmitButtonText(popupEditAvatar, "Сохранить"));
};
profileImage.addEventListener('click', () => openPopup(popupEditAvatar));
closePopupEditAvatarButton.addEventListener('click', () => closePopup(popupEditAvatar));
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

// Profile info

const handleEditProfileFormSubmit = e => {
  e.preventDefault();

  changeSubmitButtonText(popupEditProfile, "Сохранение...");

  reqPatchProfile(inputNameFormEditProfile.value, inputActivityFormEditProfile.value)
   .then(res => {
     updateProfileInfo(res);
     closePopup(popupEditProfile);
   })
   .catch(err => console.error(err))
   .finally( () => changeSubmitButtonText(popupEditProfile, "Сохранить"));
};
openPopupEditProfileButton.addEventListener('click', () => {
  inputNameFormEditProfile.value = profileName.textContent;
  inputActivityFormEditProfile.value = profileActivity.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});
closePopupEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// New place

const handleNewPlaceFormSubmit = e => {
  e.preventDefault();

  changeSubmitButtonText(popupNewCard, "Сохранение...");

  const cardName = formNewPlace.querySelector('.popup__input_type_card-name');
  const cardLink = formNewPlace.querySelector('.popup__input_type_url');

  reqPostCard(cardName.value, cardLink.value)
    .then(element => {
      placesList.prepend(createCard({element, removeCard, likeCard, openPopupImage, userId}));
      closePopup(popupNewCard);
      formNewPlace.reset();
      clearValidation(popupNewCard, validationConfig);
    })
    .catch(err => console.error(err))
    .finally( () => changeSubmitButtonText(popupNewCard, "Сохранить"));
};
openPopupNewCardButton.addEventListener('click', () => openPopup(popupNewCard));
closePopupNewCardButton.addEventListener('click', () => closePopup(popupNewCard));
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

// Remove card

const handleConfirmFormSubmit = (e, card, cardId) => {
  e.preventDefault();

  reqDeleteCard(cardId)
    .then(() => {
      card.remove();
      closePopup(popupConfirm);
    })
    .catch(err => console.error(err));
};
const removeCard = (card, cardId) => {
  openPopup(popupConfirm);
  formConfirm.onsubmit = e => handleConfirmFormSubmit(e, card, cardId);
};
closePopupConfirm.addEventListener('click', () => closePopup(popupConfirm));

// Image

function openPopupImage() {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');

  image.src = this.src;
  image.alt = this.alt;
  caption.textContent = this.alt;

  openPopup(popupImage);
};
closePopupImage.addEventListener('click', () => closePopup(popupImage));

// Loading

showPreloader(places, preloadElement);
preloadBlur(listBlur);

// Validation form

enableValidation(validationConfig);

// Profile & Cards GET requests

Promise.all([reqGetProfile(), reqGetCards()])
  .then(([userInfo, cardInfo]) => {
    userId = userInfo._id;
    updateProfileInfo(userInfo);
    cardInfo.forEach(element => {
      placesList.append(createCard({element, removeCard, likeCard, openPopupImage, userId}));
    });
  })
  .catch(err => console.error(err))
  .finally(() => {
    const preloader = document.querySelector('.preloader');
    const withBlur = document.querySelectorAll('.filter-blur');

    removePreloader(preloader);
    preloadBlur(withBlur);
  });
