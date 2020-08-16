import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open (image, place) {
    const imageContainer = this._popupElement.querySelector('.card__img-full');
    const imageCaption = this._popupElement.querySelector('.card__img-caption');
    imageContainer.src = '';
    imageContainer.src = image;
    imageContainer.alt = place;
    imageCaption.textContent = place;
    super.open();
  }
}
