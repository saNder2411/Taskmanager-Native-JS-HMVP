import SortComponent from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import NoTasksComponent from '../components/no-tasks.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import Utils from '../utils.js';
import { SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON } from '../const.js';


const renderTask = (container, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const replaceEditToTask = () => {
    Utils.replace(taskEditComponent, taskComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const replaceTaskToEdit = () => {
    Utils.replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };


  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  Utils.renderMarkup(container, taskComponent);
};

const renderTasks = (taskList, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskList, task);
  });
};


export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      Utils.renderMarkup(container, this._noTaskComponent);
      return;
    }

    Utils.renderMarkup(container, this._sortComponent);
    Utils.renderMarkup(container, this._tasksComponent);

    const taskList = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      Utils.renderMarkup(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTaskCount = showingTasksCount;
        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        renderTasks(taskList, tasks.slice(prevTaskCount, showingTasksCount));

        if (showingTasksCount >= tasks.length) {
          Utils.remove(this._loadMoreButtonComponent);
        }
      });
    };

    renderTasks(taskList, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedTasks = [];

      switch (sortType) {
        case Utils.sortType().DATE_UP:
          sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case Utils.sortType().DATE_DOWN:
          sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case Utils.sortType().DEFAULT:
          sortedTasks = tasks.slice(0, showingTasksCount);
          break;
      }

      taskList.innerHTML = ``;

      renderTasks(taskList, sortedTasks);
      if (sortType === Utils.sortType().DEFAULT) {
        renderLoadMoreButton();
      } else {
        Utils.remove(this._loadMoreButtonComponent);
      }
    });

  }
}
