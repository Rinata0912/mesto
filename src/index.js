import './pages/index.css';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import { FormValidator } from './components/formValidator.js';
import { cardsGallerySelector, popupShowCardSelector, profileNameSelector, profileJobSelector, popupAddSelector, popupEditSelector, config, initialCards } from './utils/constants.js';

const nameInput = document.querySelector('.js-input-name');
const jobInput = document.querySelector('.js-input-job');
const profileEditButton = document.querySelector('.profile__btn_type_edit');
const profileAddButton = document.querySelector('.profile__btn_type_add');

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link,
        () => {
          const popupWithImageElement = new PopupWithImage(popupShowCardSelector, item.link, item.name);
          popupWithImageElement.open();
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardsGallerySelector
);

const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector});

const popupEditProfile = new PopupWithForm(popupEditSelector,
  (formValues) => {
    userInfo.setUserInfo(formValues.name, formValues.job);
  }
);

const popupAddCard = new PopupWithForm (popupAddSelector,
  (formValues) => {
    const card = new Card(formValues.place, formValues.image,
      () => {
        const popupWithImageElement = new PopupWithImage(popupShowCardSelector, formValues.image, formValues.place);
        popupWithImageElement.open();
      }
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
);

const addFormValidator = new FormValidator(config, popupAddCard.returnFormElement());

const editFormValidator = new FormValidator(config, popupEditProfile.returnFormElement());


addFormValidator.enableValidation();
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
