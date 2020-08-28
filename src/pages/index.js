import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/formValidator.js';
import { Api } from '../components/Api.js';
import {
  cardsGallerySelector,
  cardTemplateSelector,
  popupShowCardSelector,
  profileNameSelector,
  profileJobSelector,
  popupAddSelector,
  popupEditSelector,
  popupUpdateAvatarSelector,
  config,
  initialCards,
  popupConfirmSelector,
} from '../utils/constants.js';

const nameInput = document.querySelector('.js-input-name');
const jobInput = document.querySelector('.js-input-job');
const profileEditButton = document.querySelector('.profile__btn_type_edit');
const profileAddButton = document.querySelector('.profile__btn_type_add');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '0104c4f6-b4d1-4baf-96ce-c414c2f8cbbe',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    const [apiUserInfo, initCards] = values;
    userInfo.setUserInfo(
      apiUserInfo.name,
      apiUserInfo.about,
      apiUserInfo._id
    );
    userInfo.setUserAvatar(apiUserInfo.avatar);
    const userID = userInfo.getUserID();

    function createCard(item) {
      const card = new Card({
        cardTemplateSelector: cardTemplateSelector,
        place: item.name,
        image: item.link,
        likes: item.likes,
        isOwn: item.owner._id === userID,
        id: item._id,
        isLiked: !!item.likes.find((like) => like._id === userID),
        handleCardClick: () => {
          const popupWithImageElement = new PopupWithImage(
            popupShowCardSelector
          );
          popupWithImageElement.open(item.link, item.name);
        },
        handleDeleteBtnClick: () => {
          const popupConfirm = new PopupDeleteCard(
            popupConfirmSelector,
            () => {
              api
                .deleteCard(card.getCardID())
                .then((res) => card.deleteCard());
            }
          );
          popupConfirm.open();
        },
        handleLike: () => {
          api.likeCard(card.getCardID()).then((res) => {
            card.updateLikeCounter(res.likes);
            card.toggleCardButton();
          });
        },
        handleUnlike: () => {
          return api.unlikeCard(card.getCardID()).then((res) => {
            card.updateLikeCounter(res.likes);
            card.toggleCardButton();
          });
        },
      });
      const cardElement = card.generateCard(userID);
      return cardElement;
    }

    const cardList = new Section(
      {
        items: initCards.reverse(),
        renderer: (item) => {
          cardList.addItem(createCard(item));
        },
      },
      cardsGallerySelector
    );

    const popupAddCard = new PopupWithForm(popupAddSelector, (formValues) => {
      popupAddCard.renderLoading(true);
      api.addCard(formValues.place, formValues.image).then((cardItem) => {
        cardList.addItem(createCard(cardItem));
        popupAddCard.renderLoading(false);
        popupAddCard.close();
      });
    });

    const addFormValidator = new FormValidator(
      config,
      popupAddCard.returnFormElement()
    );

    addFormValidator.enableValidation();
    cardList.renderElements();

    profileAddButton.addEventListener('click', () => {
      addFormValidator.cleanForm();
      popupAddCard.open();
    });
  })
  .catch(error => console.log(error));

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  handleAvatarClick: () => {
    popupUpdateAvatar.open();
  }
});

userInfo.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditSelector, (formValues) => {
  popupEditProfile.renderLoading(true);
  api.editProfileInfo(formValues.name, formValues.job)
    .then((profileInfo) => {
      userInfo.setUserInfo(profileInfo.name, profileInfo.about);
      popupEditProfile.renderLoading(false);
      popupEditProfile.close();
    })
    .catch(error => console.log(error));
});

const editFormValidator = new FormValidator(
  config,
  popupEditProfile.returnFormElement()
);

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector,
  (formValue) => {
    popupUpdateAvatar.renderLoading(true);
    api.updateAvatar(formValue.avatar)
    .then(res => {
      userInfo.setUpdateAvatar(res.avatar);
      popupUpdateAvatar.renderLoading(false);
      popupUpdateAvatar.close();
    })
    .catch(error => console.log(error));
  }
);

const updateAvatarFromValidator = new FormValidator(
  config,
  popupUpdateAvatar.returnFormElement()
);

editFormValidator.enableValidation();
updateAvatarFromValidator.enableValidation();


profileEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();

  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;

  editFormValidator.cleanForm();
  popupEditProfile.open();
});
