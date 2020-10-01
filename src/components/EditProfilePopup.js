import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup( {isOpen, onClose, onUpdateUser} ) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
    
    function handleChangeName(e) {
        setName(e.target.value);
    };

    function hanldeChangeDescription(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
          });
    };

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm title="Редактировать профиль" onClose={onClose} onSubmit={handleSubmit} name="changeProfile" isOpen={isOpen} >
            <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose}/>
            <h3 className="popup__heading">Редактировать профиль</h3>
            <input id="input-name" value={name || ''} onChange={handleChangeName} name="name" className="popup__input" type="text" minLength="2" maxLength="40" required placeholder="Имя" />
            <span id="input-name-error" className="popup__error"/>
            <input id="input-about"  value={description || ''} onChange={hanldeChangeDescription} name="about" className="popup__input" type="text" minLength="2" maxLength="200" required placeholder="О себе" />
            <span id="input-about-error" className="popup__error"/>
            <button className="popup__submit-button" type="submit" aria-label="Сохранить">Сохранить</button>
        </PopupWithForm>
    );
};

export default EditProfilePopup;