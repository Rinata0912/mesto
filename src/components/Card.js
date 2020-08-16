class Card {
  constructor (place, image, handleCardClick) {
    this._place = place;
    this._image = image;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleCardButton = () => {
    this._element.querySelector('.card__btn').classList.toggle('card__btn-active');
  };

  _setEventListeners() {
    this._element.querySelector('.card__delete-btn').addEventListener('click', this._deleteCard);
    this._element.querySelector('.card__btn').addEventListener('click', this._toggleCardButton);
    this._element.querySelector('.card__show-image').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleCardClick();
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

export {Card}
