import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
    >
      <label className="form__label">
        <input
          type="url"
          name="avatar"
          ref={avatarRef}
          className="form__input form__input_type_url"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
        />
        <span className="form__error" id="avatar-error"></span>
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

export default EditAvatarPopup;
