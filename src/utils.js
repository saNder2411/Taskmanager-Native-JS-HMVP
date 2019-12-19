export default class Utils {
  static getRandomNumberFromPeriod(max, min = 0) {
    return min + Math.floor((max - min) * Math.random());
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

    return newElement.firstElementChild;
  }

  static renderPosition() {
    return {
      AFTERBEGIN: `afterbrgin`,
      BEFOREEND: `beforeend`
    };
  }

  static renderMarkup(container, component, place = this.renderPosition().BEFOREEND) {
    switch (place) {
      case this.renderPosition().AFTERBEGIN:
        container.prepend(component.getElement());
        break;
      case this.renderPosition().BEFOREEND:
        container.append(component.getElement());
        break;
    }
  }

  static remove(component) {
    component.getElement().remove();
    component.removeElement();
  }

  static replace(oldComponent, newComponent) {
    const oldElement = oldComponent.getElement();
    const newElement = newComponent.getElement();

    if (oldElement && newElement) {
      oldElement.replaceWith(newElement);
    }
  }

  static sortType() {
    return {
      DEFAULT: `default`,
      DATE_UP: `date-up`,
      DATE_DOWN: `date-down`,
    };
  }

  static modeTask() {
    return {
      DEFAULT: `default`,
      EDIT: `edit`,
    };
  }
}
