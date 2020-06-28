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

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();

  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = placeInput.value;
  card.querySelector('.card__image').src = imgInput.value;
  card.querySelector('.card__image').alt = placeInput.value;

  cardsGallery.prepend(card);

  closePopup(popupAdd);
}

formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => openPopup(popupAdd));

