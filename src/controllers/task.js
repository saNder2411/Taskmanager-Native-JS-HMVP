import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import Utils from '../utils.js';


export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Utils.modeTask().DEFAULT;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _replaceTaskToEdit() {
    this._onViewChange();

    Utils.replace(this._taskComponent, this._taskEditComponent);
    this._mode = Utils.modeTask().EDIT;
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    Utils.replace(this._taskEditComponent, this._taskComponent);
    this._mode = Utils.modeTask().DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setDefaultView() {
    if (this._mode !== Utils.modeTask().DEFAULT) {
      this._replaceEditToTask();
    }
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEditComponent.setSubmitHandler(() => this._replaceEditToTask());

    if (oldTaskComponent && oldTaskEditComponent) {
      Utils.replace(oldTaskComponent, this._taskComponent);
      Utils.replace(oldTaskEditComponent, this._taskEditComponent);
    } else {
      Utils.renderMarkup(this._container, this._taskComponent);
    }
  }
}
