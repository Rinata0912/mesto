class Card {
  constructor ({cardTemplateSelector, place, image, likes, isOwn, isLiked, id, handleCardClick, handleDeleteBtnClick, handleLike, handleUnlike}) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._place = place;
    this._image = image;
    this._likes = likes;
    this._isOwn = isOwn;
    this._id = id;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
  }

  getCardID() {
    return this._id;
  }

  _getCardTemplate() {
    const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  toggleCardButton () {
    const cardBtn = this._element.querySelector('.card__btn');
    if(this._isLiked) {
      cardBtn.classList.add('card__btn-active');
    } else {
      cardBtn.classList.remove('card__btn-active');
    }
  };

  _handleClickLike = (evt) => {
    evt.preventDefault();
    if(this._isLiked) {
      this._handleUnlike();
      this._isLiked = false;
    } else {
      this._handleLike();
      this._isLiked = true;
    }
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDeleteBtnClick();
    });
    // this._element.querySelector('.card__btn').addEventListener('click', this._toggleCardButton);
    this._element.querySelector('.card__btn').addEventListener('click', this._handleClickLike);

    this._element.querySelector('.card__show-image').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleCardClick();
    });
  }

  generateCard(userID) {
    this._element = this._getCardTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    const cardPlace = this._element.querySelector('.card__title');
    this._cardLikes = this._element.querySelector('.card__like-counter');
    const cardDeleteBtn = this._element.querySelector('.card__delete-btn');
    if(this._isOwn) {
      cardDeleteBtn.classList.add('card__delete-btn_state_visible');
    }

    this.toggleCardButton(this._likes, userID);

    cardImage.src = this._image;
    cardImage.alt = this._place;
    cardPlace.textContent = this._place;
    this._cardLikes.textContent = this._likes.length;

    return this._element;
  }

  updateLikeCounter(likes) {
    this._likes = likes;
    this._cardLikes.textContent = this._likes.length;
  }
}

export {Card}
