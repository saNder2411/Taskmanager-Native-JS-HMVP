const SHAKE_ANIMATION_TIMEOUT = 600;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/task-manager`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const ShowingTaskCount = {
  ON_START: 8,
  BY_BUTTON: 8,
};

const DAYS = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
];

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

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const ResponseStatusOkPeriod = {
  MIN: 200,
  MAX: 300,
};

const DefaultData = {
  DELETE_BUTTON_TEXT: `Delete`,
  SAVE_BUTTON_TEXT: `Save`,
};

export {
  ShowingTaskCount, DAYS, Colors, Color, SortType, Mode, FilterType,
  DescriptionLength, HIDDEN_CLASS, MenuItem, ColorValue, Method,
  AUTHORIZATION, END_POINT, ResponseStatusOkPeriod, DefaultData,
  SHAKE_ANIMATION_TIMEOUT, STORE_NAME
};
