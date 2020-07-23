class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  _showInputError ({inputElement, errorMessage}) {
    const errorElement = inputElement.closest(this._data.controlSelector).querySelector(this._data.errorSelector);

    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError ({inputElement}) {
    const errorElement = inputElement.closest(this._data.controlSelector).querySelector(this._data.errorSelector);

    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._data.errorClass);
  }

  _isValid (inputElement) {
    return inputElement.validity.valid;
  }

  _toggleError ({inputElement}) {
    if(!this._isValid(inputElement)) {
      this._showInputError({inputElement, errorMessage: inputElement.validationMessage});
    } else {
      this._hideInputError({inputElement});
    }
  }

  _hasInvalidInput (inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState ({inputList, buttonElement}) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._data.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._data.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners () {
    const inputList = this._formElement.querySelectorAll(this._data.inputSelector);
    const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);

    if(!this._formElement.checkValidity()) {
      this._toggleButtonState({inputList, buttonElement});
    }

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleError({inputElement});
        this._toggleButtonState({inputList, buttonElement});
      });
    });
  }

  _cleanForm () {
    if(this._formElement) {
      const inputList = this._formElement.querySelectorAll(this._data.inputSelector);
      const formButtom = this._formElement.querySelector(this._data.submitButtonSelector);
      inputList.forEach((inputElement) => {
        this._hideInputError({inputElement});
      });
      this._toggleButtonState({inputList, buttonElement: formButtom});
    }
  }

  enableValidation () {
    this._cleanForm();
    this._setEventListeners();
  }
}

export {FormValidator};
