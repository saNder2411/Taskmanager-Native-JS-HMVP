import AbstractComponent from './abstract-component.js';
import Utils from '../utils.js';

const createSortTemplate = () => (
  `<div class="board__filter-list">
    <a href="#" data-sort-type="${Utils.sortType().DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
    <a href="#" data-sort-type="${Utils.sortType().DATE_UP}" class="board__filter">SORT BY DATE up</a>
    <a href="#" data-sort-type="${Utils.sortType().DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
  </div>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = Utils.sortType().DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
