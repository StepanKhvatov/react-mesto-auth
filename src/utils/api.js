import { config } from './constants';

class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(res.statusText);
    }
  }

  getInitialCards() {
    return fetch(
      `${this.url}/cards`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
      },
    )

      .then(this._handleResponse);
  }

  postCard(data) {
    return fetch(
      `${this.url}/cards`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      },
    )

      .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(
      `${this.url}/cards/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'DELETE',
      },
    )

      .then(this._handleResponse);
  }

  changeAvatar(link) {
    return fetch(
      `${this.url}/users/me/avatar`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'PATCH',
        body: JSON.stringify({
          avatar: link,
        }),
      },
    )
      .then(this._handleResponse);
  }

  setUserInfo(name, about) {
    return fetch(
      `${this.url}/users/me`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      },
    )

      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(
      `${this.url}/users/me`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
      },
    )

      .then(this._handleResponse);
  }

  putLike(id) {
    return fetch(
      `${this.url}/cards/${id}/likes`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'PUT',
      },
    )

      .then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(
      `${this.url}/cards/${id}/likes`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${localStorage.jwt}`,
        },
        method: 'DELETE',
      },
    )

      .then(this._handleResponse);
  }
}

const api = new Api(config);

export default api;
