import {Popup} from './popup.js';

export class PopupWithForm extends Popup{
  constructor (popupSelector, handleFormSubmit) {
    super (popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
  }

  returnFormElement () {
    return this._formElement;
  }

  _getInputValues () {
    this._inputList = this._formElement.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _formSubmiter = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener('mousedown', this._handleClickClose);
    this._formElement.addEventListener('submit', this._formSubmiter);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener('mousedown', this._handleClickClose);
    this._formElement.removeEventListener('submit', this._formSubmiter);
  }

  close () {
    this.removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
    this._formElement.reset();
  }

  open () {
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }
}
