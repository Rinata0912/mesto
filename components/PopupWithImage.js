import { Popup } from './Popup.js';
import { popupOpenedSelector } from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector, image, place) {
    super(popupSelector);
    this._image = image;
    this._place = place;
  }

  open () {
    const imageContainer = this._popupElement.querySelector('.card__img-full');
    const imageCaption = this._popupElement.querySelector('.card__img-caption');
    imageContainer.src = '';
    imageContainer.src = this._image;
    imageContainer.alt = this._place;
    imageCaption.textContent = this._place;
    this.setEventListeners();
    this._popupElement.classList.add(popupOpenedSelector);
  }
}
