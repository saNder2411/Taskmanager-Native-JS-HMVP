import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import TasksModel from './models/tasks.js';
import { generateTasks } from './mock/task.js';
import Render from './utils/render.js';
import { TASK_COUNT } from './const.js';

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

siteMenuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

Render.renderMarkup(siteHeader, siteMenuComponent);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMain, tasksModel);
filterController.render();


const boardComponent = new BoardComponent();
Render.renderMarkup(siteMain, boardComponent);


const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();
