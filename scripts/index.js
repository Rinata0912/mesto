const popupEdit = document.querySelector('.js-popup-edit');
const popupAdd = document.querySelector('.js-popup-add');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-btn');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-btn');
const formElementEdit = popupEdit.querySelector('.form');
const nameInput = formElementEdit.querySelector('.js-input-name');
const jobInput = formElementEdit.querySelector('.js-input-job');
const formElementAdd = popupAdd.querySelector('.form');
const placeInput = formElementAdd.querySelector('.js-input-place');
const imgInput = formElementAdd.querySelector('.js-input-img');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileEditButton = profile.querySelector('.profile__btn_type_edit');
const profileAddButton = profile.querySelector('.profile__btn_type_add');
const cardsGallery = document.querySelector('.cards-gallery');
const cardTemplate = document.querySelector('#card-template').content;
const popupShowCard = document.querySelector('.js-popup-show-card');
const cardImgFull = popupShowCard.querySelector('.card__img-full');
const popupShowCardCloseButton = popupShowCard.querySelector('.popup__close-btn');
const cardImgCaption = popupShowCard.querySelector('.card__img-caption');
let currentOpenedPopup;
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

function addInitCards () {
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

  initialCards.forEach(function (item) {
    addCard(item.name, item.link);
  });
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(currentOpenedPopup);
  }
}

function popupClickHandler (evt) {
  if(!currentOpenedPopup.querySelector('.popup__container').contains(evt.target)) {
    closePopup(currentOpenedPopup);
  }
}

function openPopup (popup) {
  currentOpenedPopup = popup;
  cleanForm({formElement: popup.querySelector(config.formSelector), ...config});
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('mousedown', popupClickHandler);
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  currentOpenedPopup = null;
  popup.querySelectorAll(config.inputSelector).forEach((inputElement) => {
    inputElement.removeEventListener('input', () => {
      toggleError({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('mousedown', popupClickHandler);
}

function deleteCard (button) {
  button.closest('.card').remove();
}

function addCard (place, img) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const deleteButton = card.querySelector('.card__delete-btn');
  const cardButton = card.querySelector('.card__btn');
  const cardShowImage = card.querySelector('.card__show-image');

  cardTitle.textContent = place;
  cardImage.src = img;
  cardImage.alt = place;

  deleteButton.addEventListener('click', () => deleteCard(deleteButton));

  cardButton.addEventListener('click', () => {
    cardButton.classList.toggle('card__btn-active');
  });

  cardShowImage.addEventListener('click', (evt) => {
    evt.preventDefault();

    cardImgFull.src = '';

    cardImgFull.src = img;
    cardImgFull.alt = place;
    cardImgCaption.textContent = place;

    openPopup(popupShowCard);
  });

  cardsGallery.prepend(card);
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();

  addCard(placeInput.value, imgInput.value);

  closePopup(popupAdd);
}

addInitCards();
enableValidation(config);

formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => {
  placeInput.value = '';
  imgInput.value = '';
  openPopup(popupAdd);
});
popupShowCardCloseButton.addEventListener('click', () => {
  closePopup(popupShowCard);
});
