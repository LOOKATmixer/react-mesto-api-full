import FormValidator from "./FormValidator.js";

// Массив карточек
export const initialCards = [];

// Объект с элементами форм
export const validationParams = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

export const cardId = "#card";

//popupProfile и внутренности
export const formProfile = document.forms.formProfile;
export const formProfileValidator = new FormValidator(
  validationParams,
  formProfile
);
export const popupProfile = document.querySelector(".popup_type_profile");
export const inputName = formProfile.elements.nameProfile;
export const inputAbout = formProfile.elements.aboutProfile;

//popupCard и внутренности
export const formPlace = document.forms.formPlace;
export const formPlaceValidator = new FormValidator(
  validationParams,
  formPlace
);
export const popupCard = document.querySelector(".popup_type_card");
export const cardNameInput = formPlace.elements.name;
export const cardImageUrl = formPlace.elements.link;

//popupImage и внутренности
export const popupImage = document.querySelector(".popup_type_image");

//popupDelete и внутренности
export const popupDelete = document.querySelector(".popup_type_delete");

//popupAvatar и внутренности
export const formAvatar = document.forms.formAvatar;
export const formAvatarValidator = new FormValidator(
  validationParams,
  formAvatar
);
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const profileAvatarUrl = formAvatar.elements.name;

//buttons
export const editButton = document.querySelector(".profile__edit-button");
export const cardButton = document.querySelector(".profile__button");
export const avatarButton = document.querySelector(".profile__image-edit");
export const profileCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
export const cardCloseButton = popupCard.querySelector(".popup__close-button");
export const imageSaveButton = popupCard.querySelector(".popup__save-button");
export const profileSaveButton = popupProfile.querySelector(
  ".popup__save-button"
);
export const popupDeleteButton = popupDelete.querySelector(
  ".popup__close-button"
);

//____
export const profileName = document.querySelector(".profile__info-title");
export const profileAbout = document.querySelector(".profile__description");
export const profileAvatar = document.querySelector(".profile__image");

export const cardListSelector = ".elements__list";

//export const popups = Array.from(document.querySelectorAll(".popup"));
