import {Card, popupShowCardCloseButton} from './card.js';
import {initialCards} from './initialCards.js';
import {Section} from './section.js';
import {PopupWithForm} from './popupWithForm.js';
import { PopupWithImage } from './popupWithImage.js';
import { UserInfo } from './userInfo.js';
import { FormValidator } from './formValidator.js';
import { config } from './utils.js';

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
      const card = new Card(item.name, item.link,
        () => {
          const popupWithImageElement = new PopupWithImage('.js-popup-show-card', item.link, item.name);
          popupWithImageElement.open();
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardsGallerySelector
);

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

const popupEditProfile = new PopupWithForm('.js-popup-edit',
  (formValues) => {
    userInfo.setUserInfo(formValues.name, formValues.job);
  }
);

const popupAddCard = new PopupWithForm ('.js-popup-add',
  (formValues) => {
    const card = new Card(formValues.place, formValues.image,
      () => {
        const popupWithImageElement = new PopupWithImage('.js-popup-show-card', formValues.image, formValues.place);
        popupWithImageElement.open();
      }
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
);

const addFormValidator = new FormValidator(config, popupAddCard.returnFormElement());
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, popupEditProfile.returnFormElement());
editFormValidator.enableValidation();

cardList.renderElements();

profileEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();

  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;

  editFormValidator.cleanForm();
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => {
  addFormValidator.cleanForm();
  popupAddCard.open();
});
