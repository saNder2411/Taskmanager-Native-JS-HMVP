import Common from '../utils/common.js';

const generateFilters = (filterNames) => {
  return filterNames.map((name) => ({
    title: name,
    count: Common.getRandomNumberFromPeriod(10, 1),
  }));
};

export { generateFilters };
