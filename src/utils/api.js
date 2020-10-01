import {config} from './constants.js';

class Api {
    constructor({ url, headers = {} }) {
        this.url = url;
        this.headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            Promise.reject(res.statusText)
        }
    }

    getInitialCards() {
        return fetch(
            `${this.url}/cards`,
            {
              headers: this.headers
            }
        )

        .then(this._handleResponse)
    }

    postCard(data) {
        return fetch(
            `${this.url}/cards`,
            {
              headers: this.headers,
              method: 'POST',
              body: JSON.stringify({
                name: data.name,
                link: data.link
              })
            }
        )

        .then(this._handleResponse)
    }

     deleteCard(id) {
        return fetch(
          `${this.url}/cards/${id}`,
          {
            headers: this.headers,
            method: 'DELETE'
          }
        )

        .then(this._handleResponse)
     }

     changeAvatar(link) {
        return fetch(
            `${this.url}/users/me/avatar`,
            {
              headers: this.headers,
              method: 'PATCH',
              body: JSON.stringify({
                avatar: link
              })
            }
        )

        .then(this._handleResponse)
     }

     setUserInfo(name, about) {
        return fetch(
          `${this.url}/users/me`,
          {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
              name: name,
              about: about,
            })
          }
        )

        .then(this._handleResponse)
     }

     getUserInfo() {
        return fetch(
          `${this.url}/users/me`,
          {
            headers: this.headers,
          }
        )

        .then(this._handleResponse)
     }

     putLike(id) {
        return fetch(
          `${this.url}/cards/likes/${id}`,
          {
            headers: this.headers,
            method: 'PUT'
          }
        )

        .then(this._handleResponse)
     }

     deleteLike(id) {
        return fetch(
          `${this.url}/cards/likes/${id}`,
          {
            headers: this.headers,
            method: 'DELETE'
          }
        )

        .then(this._handleResponse)
     }
}

const api = new Api(config);

export default api;
