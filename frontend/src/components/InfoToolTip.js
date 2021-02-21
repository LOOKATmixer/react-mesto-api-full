import React from "react";

function infoTooltip({ isOpen, onClose, title, icon }) {
  return (
    <div className={`popup popup_type ${isOpen && "popup_opened"}`} id="popup-toolTip">
      <div className="popup__container popup__container_forms">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img src={icon} alt="Лого" className="popup__tool-logo" />
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>
  );
}

export default infoTooltip;