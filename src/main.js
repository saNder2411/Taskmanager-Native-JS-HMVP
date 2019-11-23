

import { createMainMenuTemplate } from './components/site-menu.js';
import { createFilterTemplate } from './components/filter.js';
import { createBoardTemplate } from './components/board.js';
import { createTaskTemplate } from './components/task.js';
import { createTaskEditTemplate } from './components/task-edit.js';
import { createLoadMoreButtonTemplate } from './components/load-more-button.js';

const TASK_COUNT = 3;
const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);

const renderTemplate = (container, template, renderCount = 1, place = `beforeend`) => {
  for (let i = 0; i < renderCount; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

renderTemplate(headerMain, createMainMenuTemplate());
renderTemplate(siteMain, createFilterTemplate());
renderTemplate(siteMain, createBoardTemplate());

const taskList = siteMain.querySelector(`.board__tasks`);
renderTemplate(taskList, createTaskEditTemplate());

renderTemplate(taskList, createTaskTemplate(), TASK_COUNT);

const board = siteMain.querySelector(`.board`);
renderTemplate(board, createLoadMoreButtonTemplate());
