import React from 'react';

function InfoTooltip({ onClose, settings }) {
  return (
    <div id="infoTooltip" className={`popup ${settings.isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container">
        <img className="popup__auth-icon" src={settings.icon} alt="Иконка подсказки" />
        <p className="popup__auth-error">{settings.text}</p>
        <button className="popup__close-button" type="button" onClick={onClose} aria-label="Закрыть"/>
      </div>
    </div>
  );
}

export default InfoTooltip;
