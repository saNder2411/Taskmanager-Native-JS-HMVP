import Utils from './utils.js';
import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import LoadMoreButtonTemplateComponent from './components/load-more-button.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';
import { TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON, FILTER_NAMES } from './const.js';

const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);
Utils.renderMarkup(headerMain, new SiteMenuComponent().getElement());

const filters = generateFilters(FILTER_NAMES);
Utils.renderMarkup(siteMain, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
Utils.renderMarkup(siteMain, boardComponent.getElement());

const taskList = boardComponent.getElement().querySelector(`.board__tasks`);
const tasks = generateTasks(TASK_COUNT);

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskList.replaceWith(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskList.replaceWith(taskComponent.getElement(), taskEditComponent.getElement());
  });

  Utils.renderMarkup(taskList, taskComponent.getElement());
};

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount).forEach((task) => renderTask(task));

const loadMoreButtonComponent = new LoadMoreButtonTemplateComponent();
Utils.renderMarkup(boardComponent.getElement(), loadMoreButtonComponent.getElement());

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
