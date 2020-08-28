import { Popup } from './Popup.js';

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
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._formSubmiter);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener('submit', this._formSubmiter);
  }

  close () {
    super.close();
    this._formElement.reset();
  }

  renderLoading (isLoading) {
    const btnElement = this._formElement.querySelector('.form__submit-btn');
    if(isLoading) {
      if(this._formElement.name === 'addCardForm') {
        btnElement.textContent = 'Создание...';
      } else if(this._formElement.name === 'confirmForm'){
        btnElement.textContent = 'Удаление...';
      } else {
        btnElement.textContent = 'Сохранение...';
      }

    } else {
      if(this._formElement.name === 'addCardForm') {
        btnElement.textContent = 'Создать';
      } else if(this._formElement.name === 'confirmForm'){
        btnElement.textContent = 'Да';
      } else {
        btnElement.textContent = 'Сохранить';
      }
    }
  }
}
