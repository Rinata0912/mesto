export class Api {
  constructor(options) {
    this._options = options;
  }

  _handleOriginalRes = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getInitialCards () {
    return fetch(`${this._options.baseUrl}/cards`, {headers: this._options.headers})
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  getUserInfo () {
    return fetch(`${this._options.baseUrl}/users/me`, {headers: this._options.headers})
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  editProfileInfo (name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  addCard (name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  deleteCard (id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  likeCard (id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  unlikeCard (id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }

  updateAvatar (avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleOriginalRes)
      .then(res => res)
  }
}
