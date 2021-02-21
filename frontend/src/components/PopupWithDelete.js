import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithDelete(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <button
        className="popup__save-button"
        type="submit"
      >
        {props.isLoading ? "Удаление..." : "Да"}
      </button>
    </PopupWithForm>
  );
}

export default PopupWithDelete;