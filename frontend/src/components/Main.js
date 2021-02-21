import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="section">
      <section className="section profile">
        <div className="profile__content">
          <div className="profile__image-group">
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__image"
            />
            <button
              onClick={props.onEditAvatar}
              className="profile__image-edit"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              className="profile__edit-button"
              aria-label="Закрыть"
            />
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__button"
        />
      </section>
      <section className="section elements">
        <ul className="elements__list">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
