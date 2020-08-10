import {Popup} from './popup.js';

export class PopupWithForm {
  constructor (popupSelector, handleFormSubmit) {
    super (popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
  }

  _getInputValues () {
    this._inputList = this._formElement.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleClickClose);

    this._handleFormSubmit(this._getInputValues());
  }

  close () {

  }
}
