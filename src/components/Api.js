export class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    fetch(`${this._options.baseUrl}`)
      .then(res => res.json())
      .then(console.log(res))
  }

  getUserInfo() {

  }
}
