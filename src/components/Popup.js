export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = document.querySelector(popupSelector).querySelector('.popup__close-btn');
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleClickClose);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._handleClickClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose = (evt) => {
    if(evt.target === evt.currentTarget || this._closeButton.contains(evt.target)) {
      this.close();
    }
  }

  open () {
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }
}
