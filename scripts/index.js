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
const popupOpenedSelector = 'popup_opened';
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

function addInitCards (initialCards) {
  initialCards.forEach((item) => {
    const card = createCard({place: item.name, img: item.link});
    addCard(card);
  });
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(`.${popupOpenedSelector}`));
  }
}

function popupClickHandler (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function setPopupEventListeners (popup) {
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('mousedown', popupClickHandler);
}

function removePopupEventListeners (popup) {
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('mousedown', popupClickHandler);
}

function openPopup (popup) {
  setPopupEventListeners(popup);
  popup.classList.add(popupOpenedSelector);
}

function closePopup (popup) {
  popup.classList.remove(popupOpenedSelector);
  removePopupEventListeners(popup);
}

function deleteCard (button) {
  button.closest('.card').remove();
}

function createCard ({place, img}) {
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

  return card;
}

function addCard (card) {
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

  const card = createCard({place: placeInput.value, img: imgInput.value});
  addCard(card);

  closePopup(popupAdd);
}

addInitCards(initialCards);
enableValidation(config);

formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  cleanForm({formElement: popupEdit.querySelector(config.formSelector), ...config});
  openPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => {
  placeInput.value = '';
  imgInput.value = '';
  cleanForm({formElement: popupAdd.querySelector(config.formSelector), ...config});
  openPopup(popupAdd);
});
popupShowCardCloseButton.addEventListener('click', () => {
  closePopup(popupShowCard);
});
