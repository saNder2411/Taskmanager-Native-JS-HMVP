import { FILTER_NAME } from '../const.js';
import { getRandomNumberFromPeriod } from '../utils.js';

const generateFilters = () => {
  return FILTER_NAME.map((name) => ({
    title: name,
    count: getRandomNumberFromPeriod(10, 1),
  }));
};

export { generateFilters };
