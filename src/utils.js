export default class Utils {
  static getRandomNumberFromPeriod(max, min = 0) {
    return min + Math.floor(max * Math.random());
  }

  static getRandomDate() {
    const currentDate = new Date();
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * this.getRandomNumberFromPeriod(7);

    currentDate.setDate(currentDate.getDate() + diffValue);

    return currentDate;
  }

  static castTimeFormat(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  static setTimeFormat(date) {
    const hours = this.castTimeFormat(date.getHours() % 12);
    const minutes = this.castTimeFormat(date.getMinutes());
    const interval = date.getHours() > 11 ? `pm` : `am`;

    return `${hours}:${minutes} ${interval}`;
  }

  static createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  static renderPosition() {
    return {
      AFTERBEGIN: `afterbrgin`,
      BEFOREEND: `beforeend`
    };
  }

  static renderMarkup(container, element, place = this.renderPosition().BEFOREEND) {
    switch (place) {
      case this.renderPosition().AFTERBEGIN:
        container.prepend(element);
        break;
      case this.renderPosition().BEFOREEND:
        container.append(element);
        break;
    }
  }
}
