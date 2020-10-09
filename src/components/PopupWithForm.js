import React from 'react';

function PopupWithForm(props) {
  return (
    <div id={`${props.name}Popup`} className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form id={`${props.name}Form`} onSubmit={props.onSubmit} className="popup__form" noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
