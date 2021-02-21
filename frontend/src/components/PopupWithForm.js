import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_forms">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть"
        />
        <form
          onSubmit={props.onSubmit}
          className={`form form_${props.name}`}
          action="#"
          name={`${props.name}`}
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
