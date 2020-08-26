export class UserInfo {
  constructor({ nameSelector, jobSelector, handleAvatarClick }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._handleAvatarClick = handleAvatarClick;
    this._avatarElement = document.querySelector('.profile__avatar-img');
    this._avatarBtnEdit = document.querySelector('.profile__avatar-edit');
  }

  setEventListeners() {
    this._avatarBtnEdit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleAvatarClick();
    })
  }

  getUserInfo() {
    const profileInfo = {};

    profileInfo.name = this._nameElement.textContent;
    profileInfo.job = this._jobElement.textContent;

    return profileInfo;
  }

  getUserID() {
    return this._userID;
  }

  setUserInfo(name, job, userID) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._userID = userID;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  setUpdateAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
