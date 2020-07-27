import {FormValidator} from './formValidator.js';

const popupOpenedSelector = 'popup_opened';
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  controlSelector: '.form__control',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorSelector: '.form__input-error',
  errorClass: 'form__input-error_active'
};

function removePopupEventListeners (popup) {
  document.removeEventListener('keydown', closeOnEsc);
  popup.removeEventListener('mousedown', popupClickHandler);
}

function closePopup (popup) {
  popup.classList.remove(popupOpenedSelector);
  removePopupEventListeners(popup);
}

function popupClickHandler (evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(`.${popupOpenedSelector}`));
  }
}

function setFormValidator (form) {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
}

function setPopupEventListeners (popup) {
  document.addEventListener('keydown', closeOnEsc);
  popup.addEventListener('mousedown', popupClickHandler);
}

function openPopup (popup) {
  setPopupEventListeners(popup);
  if(popup.querySelector('.form')) {
    setFormValidator(popup.querySelector('.form'));
  }
  popup.classList.add(popupOpenedSelector);
}

export {popupOpenedSelector, config, removePopupEventListeners, closePopup, popupClickHandler, closeOnEsc, setFormValidator, setPopupEventListeners, openPopup};




