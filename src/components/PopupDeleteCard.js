import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, hadleConfirmDelete) {
    super(popupSelector);
    this._hadleConfirmDelete = hadleConfirmDelete;
    this._formElement = this._popupElement.querySelector('.form');
  }

  _deleteSubmiter = (evt) => {
    evt.preventDefault();
    this._hadleConfirmDelete();
    this.close();
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._deleteSubmiter);
  }

  removeEventListeners () {
    super.removeEventListeners();
    this._formElement.removeEventListener('submit', this._deleteSubmiter);
  }
}
