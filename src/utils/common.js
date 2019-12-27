import moment from 'moment';

export default class Common {
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

  static formatDate(date) {
    return moment(date).format(`DD MMMM`);
  }

  static formatTime(date) {
    return moment(date).format(`hh:mm A`);
  }

  static isRepeating(repeatingDays) {
    return Object.values(repeatingDays).some(Boolean);
  }

  static isOverdueDate(dueDate, date) {
    return dueDate < date && !this.isOneDay(date, dueDate);
  }

  static isOneDay(dateA, dateB) {
    const a = moment(dateA);
    const b = moment(dateB);
    return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
  }
}
