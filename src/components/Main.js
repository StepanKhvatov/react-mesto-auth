import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main( {cards, onCardLike, onCardDelete, onCardClick, onEditProfile, onAddPlace, onEditAvatar} ) { 
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Жак-Ив Кусто"/>
                    <div className="profile__wrapper"></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__about">{currentUser.about}</p>
                    <button className="profile__edit-button" onClick={onEditProfile}  type="button" aria-label="Кнопка редактирования профиля"/>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} aria-label="Кнопка добавления фото места"/>
            </section>
            <section className="photos">
                {
                    cards.map((card) => <Card key={card._id} card={card} onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={() => onCardClick(card)} />)
                }
            </section>
        </main>
    );
};

export default Main;