import { Method, ResponseStatusOkPeriod } from './const.js';
import TaskModel from './models/task.js';

const checkStatus = (response) => {
  if (response.status >= ResponseStatusOkPeriod.MIN && response.status < ResponseStatusOkPeriod.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({ url: `tasks` })
      .then((response) => response.json())
      .then(TaskModel.parseTasks);
  }

  createTask(task) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task.toRAW()),
      headers: new Headers({ 'Content-Type': `application/json` })
    })
      .then((response) => response.json())
      .then(TaskModel.parseTask);
  }

  updateTask(id, data) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ 'Content-Type': `application/json` })
    })
      .then((response) => response.json())
      .then(TaskModel.parseTask);
  }

  deleteTask(id) {
    return this._load({ url: `tasks/${id}`, method: Method.DELETE });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, headers, body })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
