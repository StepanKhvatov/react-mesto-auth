import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div id="photoPopup" onClick={onClose} className={`popup ${card !== null ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" onClick={onClose} type="reset" aria-label="Закрыть" />
        <img className="popup__image" alt="Не определено" src={(card === null) ? '' : card.link} />
        <p className="popup__caption">{(card === null) ? '' : card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
