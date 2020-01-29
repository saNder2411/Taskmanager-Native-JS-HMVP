import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import FilterController from './controllers/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import StatisticsComponent from './components/statistics.js';
import TasksModel from './models/tasks.js';
import Render from './utils/render.js';
import 'flatpickr/dist/flatpickr.css';
import { AUTHORIZATION, END_POINT, MenuItem, STORE_NAME } from './const.js';

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/service-worker.js`)
    .then(() => {
      document.title += `[SW]`;
    })
    .catch(() => {
      document.title += `[no SW]`;
    });
});

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tasksModel = new TasksModel();

const siteMain = document.querySelector(`.main`);
const siteHeader = siteMain.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({ tasks: tasksModel, dateFrom, dateTo });

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
const filterController = new FilterController(siteMain, tasksModel);

Render.renderMarkup(siteHeader, siteMenuComponent);
filterController.render();
Render.renderMarkup(siteMain, boardComponent);
Render.renderMarkup(siteMain, statisticsComponent);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setActiveItem(MenuItem.STATISTICS);
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
