import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/formValidator.js';
import { Api } from '../components/Api.js';
import { cardsGallerySelector, popupShowCardSelector, profileNameSelector, profileJobSelector, popupAddSelector, popupEditSelector, config, initialCards } from '../utils/constants.js';

const nameInput = document.querySelector('.js-input-name');
const jobInput = document.querySelector('.js-input-job');
const profileEditButton = document.querySelector('.profile__btn_type_edit');
const profileAddButton = document.querySelector('.profile__btn_type_add');

const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '0104c4f6-b4d1-4baf-96ce-c414c2f8cbbe',
    'Content-Type': 'application/json'
  }
});
api.getUserInfo().then(apiUserInfo => {
  userInfo.setUserInfo(apiUserInfo.name, apiUserInfo.about);
})
api.getInitialCards().then(initCards => {
  const cardList = new Section({
    items: initCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, item.likes,
        () => {
          const popupWithImageElement = new PopupWithImage(popupShowCardSelector);
          popupWithImageElement.open(item.link, item.name);
        }
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardsGallerySelector);

  const popupAddCard = new PopupWithForm (popupAddSelector,
    (formValues) => {
      api.addCard(formValues.place, formValues.image).then(cardItem => {
        const card = new Card(cardItem.name, cardItem.link, cardItem.likes,
          () => {
            const popupWithImageElement = new PopupWithImage(popupShowCardSelector);
            popupWithImageElement.open(formValues.image, formValues.place);
          }
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
        popupAddCard.close();
      })
    }
  );

  const addFormValidator = new FormValidator(config, popupAddCard.returnFormElement());

  addFormValidator.enableValidation();
  cardList.renderElements();

  profileAddButton.addEventListener('click', () => {
    addFormValidator.cleanForm();
    popupAddCard.open();
  });
});

const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector});

const popupEditProfile = new PopupWithForm(popupEditSelector,
  (formValues) => {
    api.editProfileInfo(formValues.name, formValues.job).then(profileInfo => userInfo.setUserInfo(profileInfo.name, profileInfo.about));
  }
);

const editFormValidator = new FormValidator(config, popupEditProfile.returnFormElement());

editFormValidator.enableValidation();

profileEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();

  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;

  editFormValidator.cleanForm();
    popupEditProfile.open();
});
