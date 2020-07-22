import {popupShowCard, cardImgFull, popupShowCardCloseButton, cardImgCaption, openPopup} from './index.js';

export class Card {
  constructor (place, image) {
    this._place = place;
    this._image = image;
  }

  _getCardTemplate() {
    const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _deleteCard = () => {
    this._element.remove();
  };

  _toggleCardButton = () => {
    this._element.querySelector('.card__btn').classList.toggle('card__btn-active');
  };

  _showImage() {
    cardImgFull.src = '';

    cardImgFull.src = this._image;
    cardImgFull.alt = this._place;
    cardImgCaption.textContent = this._place;

    openPopup(popupShowCard);
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete-btn').addEventListener('click', this._deleteCard);
    this._element.querySelector('.card__btn').addEventListener('click', this._toggleCardButton);
    this._element.querySelector('.card__show-image').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._showImage();
    });
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    const cardPlace = this._element.querySelector('.card__title');

    cardImage.src = this._image;
    cardImage.alt = this._place;
    cardPlace.textContent = this._place;

    return this._element;
  }
}
