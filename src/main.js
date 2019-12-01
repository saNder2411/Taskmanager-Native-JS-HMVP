import { createMainMenuTemplate } from './components/site-menu.js';
import { createFilterTemplate } from './components/filter.js';
import { createBoardTemplate } from './components/board.js';
import { createTaskTemplate } from './components/task.js';
import { createTaskEditTemplate } from './components/task-edit.js';
import { createLoadMoreButtonTemplate } from './components/load-more-button.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';

const TASK_COUNT = 22;
const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);

const renderMarkup = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

renderMarkup(headerMain, createMainMenuTemplate());

const filters = generateFilters();
renderMarkup(siteMain, createFilterTemplate(filters));
renderMarkup(siteMain, createBoardTemplate());

const taskList = siteMain.querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

renderMarkup(taskList, createTaskEditTemplate());

tasks.slice(1).forEach((task) => renderMarkup(taskList, createTaskTemplate(task)));

const board = siteMain.querySelector(`.board`);
renderMarkup(board, createLoadMoreButtonTemplate());
