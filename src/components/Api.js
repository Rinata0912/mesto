export class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {headers: this._options.headers})
      .then(res => {
        if(res.ok) {
          return res.json();
        }
      })
      .then(res => res)
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {headers: this._options.headers})
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        console.log('ошибка');
      })
      .then(res => res)
  }

  editProfileInfo(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        console.log('ошибка');
      })
      .then(res => res)
  }
}
