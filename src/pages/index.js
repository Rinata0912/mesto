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

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link,
        () => {
          const popupWithImageElement = new PopupWithImage(popupShowCardSelector);
          popupWithImageElement.open(item.link, item.name);
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
        const popupWithImageElement = new PopupWithImage(popupShowCardSelector);
        popupWithImageElement.open(formValues.image, formValues.place);
      }
    );
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
);

const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me',
    authorization: '0104c4f6-b4d1-4baf-96ce-c414c2f8cbbe'
});
api.getUserInfo().then(apiUserInfo => {
  userInfo.setUserInfo(apiUserInfo.name, apiUserInfo.about);
})


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
