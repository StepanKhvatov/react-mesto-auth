import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setLink] = React.useState('');

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="createPhoto" isOpen={isOpen}>
      <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose} />
      <h3 className="popup__heading">Новое место</h3>
      <input id="input-place" onChange={handleChangeCardName} name="name" className="popup__input" type="text" minLength="1" maxLength="30" required placeholder="Название" />
      <span id="input-place-error" className="popup__error" />
      <input id="input-link" onChange={handleChangeLink} name="link" className="popup__input" type="url" required placeholder="Ссылка на картинку" />
      <span id="input-link-error" className="popup__error" />
      <button className="popup__submit-button" aria-label="Создать" type="submit">Создать</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
