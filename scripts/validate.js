function showInputError ({inputElement, errorMessage, controlSelector, errorSelector, inputErrorClass, errorClass}) {
  const errorElement = inputElement.closest(controlSelector).querySelector(errorSelector);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError ({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass}) {
  const errorElement = inputElement.closest(controlSelector).querySelector(errorSelector);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function isValid (inputElement) {
  return inputElement.validity.valid;
}

function toggleError ({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass}) {
  if(!isValid(inputElement)) {
    showInputError({inputElement, errorMessage: inputElement.validationMessage, controlSelector, errorSelector, inputErrorClass, errorClass});
  } else {
    hideInputError({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass});
  }
}

function hasInvalidInput (inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners ({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, controlSelector, errorSelector, inputErrorClass, errorClass}) {
  const inputList = formElement.querySelectorAll(inputSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if(!formElement.checkValidity()) {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleError({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

function cleanForm ({formElement, inputSelector, submitButtonSelector, controlSelector, errorSelector, inputErrorClass, errorClass, inactiveButtonClass}) {
  if(formElement) {
    const inputList = formElement.querySelectorAll(inputSelector);
    const formButtom = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError({inputElement, controlSelector, errorSelector, inputErrorClass, errorClass});
    });
    toggleButtonState(inputList, formButtom, inactiveButtonClass);
  }
}

function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, controlSelector, errorSelector, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, controlSelector, errorSelector, inputErrorClass, errorClass});
  });
}
