export const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inactiveErrorClass: 'popup__error',
};

export const config = {
  // url: 'https://www.a.shv.students.nomoreparties.space',
  url: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization':` Bearer ${localStorage.jwt}`,
  },
};
