export class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}`)
      .then(res => res.json())
      .then(console.log(res))
  }

  getUserInfo() {
    return fetch(this._options.baseUrl, {
      headers: {
        authorization: this._options.authorization
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        console.log('ошибка');
      })
      .then(res => console.log(res)|| res)
  }
}
