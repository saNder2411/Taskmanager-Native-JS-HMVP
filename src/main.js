import Utils from './utils.js';
import SiteMenuComponent from './components/site-menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import { generateTasks } from './mock/task.js';
import { generateFilters } from './mock/filter.js';
import { TASK_COUNT, FILTER_NAMES } from './const.js';


const siteMain = document.querySelector(`.main`);
const headerMain = siteMain.querySelector(`.main__control`);
Utils.renderMarkup(headerMain, new SiteMenuComponent());

const filters = generateFilters(FILTER_NAMES);
Utils.renderMarkup(siteMain, new FilterComponent(filters));

const boardComponent = new BoardComponent();
Utils.renderMarkup(siteMain, boardComponent);


const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
