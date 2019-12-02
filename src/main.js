import { createMainMenuTemplate } from './components/site-menu.js';
import { createFilterTemplate } from './components/filter.js';
import { createBoardTemplate } from './components/board.js';
import { createTaskTemplate } from './components/task.js';
import { createTaskEditTemplate } from './components/task-edit.js';
import { createLoadMoreButtonTemplate } from './components/load-more-button.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';
import { TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON } from './const.js';

const renderMarkup = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);
renderMarkup(headerMain, createMainMenuTemplate());

const filters = generateFilters();
renderMarkup(siteMain, createFilterTemplate(filters));
renderMarkup(siteMain, createBoardTemplate());

const taskList = siteMain.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);
renderMarkup(taskList, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => renderMarkup(taskList, createTaskTemplate(task)));

const board = siteMain.querySelector(`.board`);
renderMarkup(board, createLoadMoreButtonTemplate());

const loadMoreButton = board.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => renderMarkup(taskList, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.classList.add(`visually-hidden`);
  }
});
