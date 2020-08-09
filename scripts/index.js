import {Card, popupShowCardCloseButton} from './card.js';
import {closePopup, openPopup} from './utils.js';
import {initialCards} from './initialCards.js';
import {Section} from './section.js';

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
const cardsGallerySelector = '.cards-gallery';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardsGallerySelector
);

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

  const card = new Card(placeInput.value, imgInput.value);
  const cardElement = card.generateCard();
  addCard(cardElement);

  closePopup(popupAdd);
}

cardList.renderElements();

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
