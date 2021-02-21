import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__content-basket ${
    isOwn ? "element__content-basket_visible" : "element__content-basket_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__content-like ${
    isLiked ? "element__content-like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        src={props.card.link}
        alt={`Название: ${props.card.name}`}
        onClick={handleClick}
        className="element__image"
      />
      <div className="element__content">
        <h2 className="element__content-text">{props.card.name}</h2>
        <div className="element__like-group">
          <button
            aria-label="Лайк"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
        <button
          aria-label="Удалить"
          type="button"
          onClick={handleCardDelete}
          className={cardDeleteButtonClassName}
        />
      </div>
    </li>
  );
}

export default Card;
