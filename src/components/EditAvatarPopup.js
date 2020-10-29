import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm title="Обновить аватар" onClose={onClose} name="changeAvatar" isOpen={isOpen} onSubmit={handleSubmit}>
      <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose} />
      <h3 className="popup__heading">Обновить аватар</h3>
      <input id="input-link-avatar" ref={avatarRef} name="link" className="popup__input" type="url" required placeholder="Ссылка на картинку" />
      <span id="input-link-error" className="popup__error" />
      <button className="popup__submit-button" type="submit" aria-label="Создать">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
