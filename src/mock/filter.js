import Utils from '../utils.js';

const generateFilters = (filterNames) => {
  return filterNames.map((name) => ({
    title: name,
    count: Utils.getRandomNumberFromPeriod(10, 1),
  }));
};

export { generateFilters };
