import Common from './common.js';
import { FilterType } from '../const.js';

export default class Filter {
  static getArchiveTasks(tasks) {
    return tasks.filter((task) => task.isArchive);
  }

  static getNotArchiveTasks(tasks) {
    return tasks.filter((task) => !task.isArchive);
  }

  static getFavoriteTasks(tasks) {
    return tasks.filter((task) => task.isFavorite);
  }

  static getOverdueTasks(tasks, date) {
    return tasks.filter((task) => {
      const dueDate = task.dueDate;

      if (!dueDate) {
        return false;
      }

      return Common.isOverdueDate(dueDate, date);
    });
  }

  static getRepeatingTasks(tasks) {
    return tasks.filter((task) => Common.isRepeating(task.repeatingDays));
  }

  static getTasksWithHashtags(tasks) {
    return tasks.filter((task) => task.tags.size);
  }

  static getTasksInOneDay(tasks, date) {
    return tasks.filter((task) => Common.isOneDay(task.dueDate, date));
  }

  static getTaskByFilter(tasks, filterType) {
    const nowDate = new Date();

    switch (filterType) {
      case FilterType.ALL:
        return this.getNotArchiveTasks(tasks);
      case FilterType.ARCHIVE:
        return this.getArchiveTasks(tasks);
      case FilterType.FAVORITES:
        return this.getFavoriteTasks(this.getNotArchiveTasks(tasks));
      case FilterType.OVERDUE:
        return this.getOverdueTasks(this.getNotArchiveTasks(tasks), nowDate);
      case FilterType.REPEATING:
        return this.getRepeatingTasks(this.getNotArchiveTasks(tasks));
      case FilterType.TAGS:
        return this.getTasksWithHashtags(this.getNotArchiveTasks(tasks));
      case FilterType.TODAY:
        return this.getTasksInOneDay(this.getNotArchiveTasks(tasks), nowDate);
    }
    return tasks;
  }
}
