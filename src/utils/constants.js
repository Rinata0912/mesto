const cardsGallerySelector = '.cards-gallery';
const popupShowCardSelector = '.js-popup-show-card';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const popupAddSelector = '.js-popup-add';
const popupEditSelector = '.js-popup-edit';
const popupConfirmSelector = '.js-popup-confirm';
const popupUpdateAvatarSelector = '.js-popup-update-avatar';
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  controlSelector: '.form__control',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorSelector: '.form__input-error',
  errorClass: 'form__input-error_active'
};
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export { cardsGallerySelector, popupShowCardSelector, profileNameSelector, profileJobSelector, popupAddSelector, popupEditSelector, config, initialCards, popupConfirmSelector, popupUpdateAvatarSelector };
