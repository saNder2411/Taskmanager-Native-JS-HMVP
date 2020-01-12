import LoadMoreButtonComponent from '../components/load-more-button.js';
import TasksComponent from '../components/tasks.js';
import SortComponent from '../components/sort.js';
import NoTasksComponent from '../components/no-tasks.js';
import Render from '../utils/render.js';
import TaskController, { EmptyTask } from './task.js';
import { SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON, SortType, Mode } from '../const.js';


const renderTasks = (taskList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskList, onDataChange, onViewChange);
    taskController.render(task, Mode.DEFAULT);

    return taskController;
  });
};


export default class BoardController {
  constructor(container, tasksModel, api) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._api = api;

    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTaskComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingTask = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const container = this._container.getElement();
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      Render.renderMarkup(container, this._noTaskComponent);
      return;
    }

    Render.renderMarkup(container, this._sortComponent);
    Render.renderMarkup(container, this._tasksComponent);

    this._renderTasks(tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskList = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskList, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, Mode.ADDING);
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _renderTasks(tasks) {
    const taskList = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskList, tasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._showingTasksCount = this._showedTaskControllers.length;

  }

  _renderLoadMoreButton() {
    Render.remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    Render.renderMarkup(container, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === EmptyTask) {
      this._creatingTask = null;
      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, Mode.DEFAULT);

        const destroyedTask = this._showedTaskControllers.pop();
        destroyedTask.destroy();

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;
      }
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._showingTasksCount);
    } else {
      this._api.updateTask(oldData.id, newData)
        .then((tasksModel) => {
          const isSuccess = this._tasksModel.updateTask(oldData.id, tasksModel);

          if (isSuccess) {
            taskController.render(tasksModel, Mode.DEFAULT);
            this._updateTasks(this._showingTasksCount);
          }
        });
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((taskController) => taskController.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];
    const tasks = this._tasksModel.getTasks();

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = tasks.slice(0, this._showingTasksCount);
        break;
    }

    this._removeTasks();
    this._renderTasks(sortedTasks);

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      Render.remove(this._loadMoreButtonComponent);
    }
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();

    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    this._renderTasks(tasks.slice(prevTasksCount, this._showingTasksCount));

    if (this._showingTasksCount >= tasks.length) {
      Render.remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}

