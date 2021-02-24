class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  addNewCards({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  changeAvatar({ avatar }) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).then(handleOriginalResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(handleOriginalResponse);
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
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
  url: "https://api.mixer.students.nomoreparties.space",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
   "Content-Type": "application/json",
 },
});
