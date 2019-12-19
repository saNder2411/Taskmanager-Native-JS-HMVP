import SortComponent from '../components/sort.js';
import TasksComponent from '../components/tasks.js';
import NoTasksComponent from '../components/no-tasks.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import Utils from '../utils.js';
import TaskController from './task.js';
import { SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON } from '../const.js';


const renderTasks = (taskList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskList, onDataChange, onViewChange);
    taskController.render(task);

    return taskController;
  });
};


export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      Utils.renderMarkup(container, this._noTaskComponent);
      return;
    }

    Utils.renderMarkup(container, this._sortComponent);
    Utils.renderMarkup(container, this._tasksComponent);

    const taskList = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskList, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    Utils.renderMarkup(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskList = this._tasksComponent.getElement();

      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = renderTasks(taskList, this._tasks.slice(prevTasksCount, this._showingTasksCount), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        Utils.remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((task) => task === oldData);

    if (index === -1) {
      return;
    }

    this._tasks.splice(index, 1, newData);

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((taskController) => taskController.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case Utils.sortType().DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case Utils.sortType().DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case Utils.sortType().DEFAULT:
        sortedTasks = this._tasks.slice(0, this._showingTasksCount);
        break;
    }

    const taskList = this._tasksComponent.getElement();
    taskList.innerHTML = ``;

    const newTasks = renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    if (sortType === Utils.sortType().DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      Utils.remove(this._loadMoreButtonComponent);
    }
  }
}

