import { Colors, DescriptionTasks, Tags, DefaultRepeatingDays } from '../const.js';
import Common from '../utils/common.js';

const generateRepeatingDays = () => {
  const repeatingDays = Object.assign({}, DefaultRepeatingDays);

  for (const day of Object.keys(repeatingDays)) {
    repeatingDays[day] = (Math.random() > 0.75);
  }

  return repeatingDays;
};

const generateTags = (tags) => tags.filter(() => Math.random() > 0.5).slice(0, 3);

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? Common.getRandomDate() : null;

  return {
    id: null,
    description: DescriptionTasks[Common.getRandomNumberFromPeriod(DescriptionTasks.length)],
    dueDate,
    repeatingDays: (dueDate) ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: Colors[Common.getRandomNumberFromPeriod(Colors.length)],
    isFavorite: (Math.random() > 0.5),
    isArchive: (Math.random() > 0.5),
  };
};

const generateTasks = (amount) => new Array(amount)
  .fill(``)
  .map((task, i) => {
    task = generateTask();
    task.id = i;
    return task;
  });

export { generateTasks };

