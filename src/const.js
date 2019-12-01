const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const FILTER_NAME = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];
const DESCRIPTION_TASKS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const MONTHS = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

export { COLORS, FILTER_NAME, TAGS, DESCRIPTION_TASKS, DAYS, MONTHS, DEFAULT_REPEATING_DAYS };
