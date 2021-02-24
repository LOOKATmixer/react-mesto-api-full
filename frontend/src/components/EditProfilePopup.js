import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfileModal(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          value={name || ""}
          onChange={handleChangeName}
          id="name-input"
          type="text"
          name="nameProfile"
          className="form__input form__input_type_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          required
        />
        <span className="form__error" id="nameProfile-error"></span>
      </label>
      <label className="form__label">
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          id="job-input"
          type="text"
          name="aboutProfile"
          className="form__input form__input_type_about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          autoComplete="off"
          required
        />
        <span className="form__error" id="aboutProfile-error"></span>
      </label>
      <button
        type="submit"
        name="saveButtonCard"
        className={`popup__save-button`}
      >
        {props.isLoading ? "Сохранение..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default EditProfileModal;
