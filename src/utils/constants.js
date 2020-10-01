export const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inactiveErrorClass: 'popup__error'
};

export const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '0fb698c6-c0f4-4661-887b-6a574c3a11ac',
    'Content-Type': 'application/json'
  }
};

