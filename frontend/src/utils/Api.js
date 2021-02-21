class Api {
  constructor(options) {
    this._url = options.url;
    this.headers = options.headers;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  addNewCards({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT": "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(handleOriginalResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(handleOriginalResponse);
  }
}

const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Err: ${res.status}`);
  }
  return res.json();
};

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "3edb3715-d2b8-46c3-8d1b-ee5c4e7c3cc4",
    "Content-Type": "application/json",
  },
});