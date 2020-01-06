const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const DescriptionTasks = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const Tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const Days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const Color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const Colors = [
  Color.BLACK,
  Color.YELLOW,
  Color.BLUE,
  Color.GREEN,
  Color.PINK
];

const ColorValue = {
  [Color.BLACK]: `#000000`,
  [Color.BLUE]: `#0c5cdd`,
  [Color.GREEN]: `#31b55c`,
  [Color.PINK]: `#ff3cb9`,
  [Color.YELLOW]: `#ffe125`,
};

const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`,
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TAGS: `tags`,
  TODAY: `today`,
};

const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATISTICS: `control__statistic`,
  TASKS: `control__task`,
};

const DescriptionLength = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 140,
};

const HIDDEN_CLASS = `visually-hidden`;

export {
  TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON,
  Tags, DescriptionTasks, Days, DefaultRepeatingDays, Colors, Color,
  SortType, Mode, FilterType, DescriptionLength, HIDDEN_CLASS, MenuItem,
  ColorValue
};
