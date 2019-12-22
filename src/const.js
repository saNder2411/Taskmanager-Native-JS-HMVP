const TASK_COUNT = 9;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const FILTER_NAMES = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];
const DESCRIPTION_TASKS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

export { TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON, COLORS, FILTER_NAMES, TAGS, DESCRIPTION_TASKS, DAYS, MONTHS, DEFAULT_REPEATING_DAYS };
