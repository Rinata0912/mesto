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

function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
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

    cardImgFull.src = img;
    cardImgFull.alt = place;
    cardImgCaption.textContent = place;

    popupShowCard.classList.toggle('popup_opened');
  });

  cardsGallery.prepend(card);
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();

  addCard(placeInput.value, imgInput.value);

  togglePopup(popupAdd);
}

function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = inputElement.closest('.form__control').querySelector('.form__input-error');

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError (formElement, inputElement) {
  const errorElement = inputElement.closest('.form__control').querySelector('.form__input-error');

  inputElement.classList.remove('form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
}

function isValid (formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

addInitCards();

formElementEdit.addEventListener('submit', formEditSubmitHandler);

formElementAdd.addEventListener('submit', formAddSubmitHandler);

popupEditCloseButton.addEventListener('click', () => togglePopup(popupEdit));

popupAddCloseButton.addEventListener('click', () => togglePopup(popupAdd));

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupEdit);
});

profileAddButton.addEventListener('click', () => {
  placeInput.value = '';
  imgInput.value = '';
  togglePopup(popupAdd)
});

popupShowCardCloseButton.addEventListener('click', () => togglePopup(popupShowCard));
