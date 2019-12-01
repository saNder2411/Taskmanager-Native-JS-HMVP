const getRandomNumberFromPeriod = (min, max) => (min + Math.floor(max * Math.random()));

const getRandomDate = () => {
  const currentDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumberFromPeriod(0, 7);

  currentDate.setDate(currentDate.getDate() + diffValue);

  return currentDate;
};

const castTimeFormat = (value) => (value < 10) ? `0${value}` : `${value}`;

const setTimeFormat = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export { getRandomNumberFromPeriod, getRandomDate, setTimeFormat };
