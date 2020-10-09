import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `photo__delete-button ${isOwn ? 'photo__delete-button_visible' : 'photo__delete-button_hidden'}`
  );
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo__like-button ${isLiked ? 'photo__like-button_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="photo">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить фото" />
      <img className="photo__place" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="photo__caption">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Добавить лайк" />
          <p className="photo__likes">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
