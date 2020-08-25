class Card {
  constructor ({place, image, likes, isOwn, id, handleCardClick, handleDeleteBtnClick}) {
    this._place = place;
    this._image = image;
    this._likes = likes.length;
    this._isOwn = isOwn;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
  }

  getCardID() {
    return this._id;
  }

  _getCardTemplate() {
    const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _toggleCardButton = () => {
    this._element.querySelector('.card__btn').classList.toggle('card__btn-active');
  };

  _setEventListeners() {
    this._element.querySelector('.card__delete-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDeleteBtnClick();
    });
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
    const cardLikes = this._element.querySelector('.card__like-counter');
    const cardDeleteBtn = this._element.querySelector('.card__delete-btn');
    if(this._isOwn) cardDeleteBtn.classList.add('card__delete-btn_state_visible');

    cardImage.src = this._image;
    cardImage.alt = this._place;
    cardPlace.textContent = this._place;
    cardLikes.textContent = this._likes;

    return this._element;
  }
}

export {Card}
