export class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo () {
    const profileInfo = {};

    profileInfo.name = this._nameElement.textContent;
    profileInfo.job = this._jobElement.textContent;

    return profileInfo;
  }

  setUserInfo (name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
