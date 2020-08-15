export class Section {
  constructor ({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
