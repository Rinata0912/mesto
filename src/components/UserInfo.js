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

  getUserID () {
    return this._userID;
  }

  setUserInfo (name, job, userID) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._userID = userID;
  }
}
