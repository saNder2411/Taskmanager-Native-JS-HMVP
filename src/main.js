import Utils from './utils.js';
import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import TasksComponent from './components/tasks.js';
import NoTasksComponent from './components/no-tasks.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';
import { TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON, FILTER_NAMES } from './const.js';

const renderTask = (container, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const replaceEditToTask = () => {
    taskEditComponent.getElement().replaceWith(taskComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskComponent.getElement().replaceWith(taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, replaceEditToTask);

  Utils.renderMarkup(container, taskComponent.getElement());
};

const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);
Utils.renderMarkup(headerMain, new SiteMenuComponent().getElement());

const filters = generateFilters(FILTER_NAMES);
Utils.renderMarkup(siteMain, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
Utils.renderMarkup(siteMain, boardComponent.getElement());


const tasks = generateTasks(TASK_COUNT);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  Utils.renderMarkup(boardComponent.getElement(), new NoTasksComponent().getElement());
} else {
  Utils.renderMarkup(boardComponent.getElement(), new SortComponent().getElement());
  Utils.renderMarkup(boardComponent.getElement(), new TasksComponent().getElement());

  const taskList = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskList, task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  Utils.renderMarkup(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => renderTask(taskList, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

