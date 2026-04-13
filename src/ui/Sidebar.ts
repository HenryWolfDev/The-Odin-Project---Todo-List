import { subscribe } from '../services/EventBus';
import { changeView, getProjects } from '../services/AppState';
import { Project } from '../core/Project';
import { Temporal } from 'temporal-polyfill';
import type { ViewChanged } from '../types/_view';
import { EVENTS } from '../types/_eventMap';

/**
 * Creates and initializes the application's main sidebar.
 * Serves as the main entry point for the sidebar UI.
 * @returns {HTMLElement} The fully configured sidebar element (aside).
 */
export function createSidebar(): HTMLElement {
  // references
  const sidebar = document.createElement('aside');
  const projectsList = document.createElement('div');
  const homeCount = document.createElement('span');
  const todayCount = document.createElement('span');

  // configured elements
  sidebar.appendChild(createNavItem('Home', homeCount, getTotalCount(), { view: 'HOME' }));
  sidebar.appendChild(createNavItem('Today', todayCount, getTodayCount(), { view: 'TODAY' }));
  sidebar.appendChild(createProjectList(projectsList, getProjects()));
  sidebar.appendChild(createAddButton());

  // subscribtions
  registerSidebarEvents(sidebar, projectsList, homeCount, todayCount);

  return sidebar;
}

// #region event-subscribtions
/**
 * Initializes all event listeners for the sidebar.
 * This is the central function for linking the sidebar UI with the app logic.
 *
 * @param sidebar - The main sidebar element (aside).
 * @param projectsList - The container that holds the project items.
 * @param homeCount - The badge element for the total number of tasks.
 * @param todayCount - The badge element for today's tasks.
 */
function registerSidebarEvents(
  sidebar: HTMLElement,
  projectsList: HTMLElement,
  homeCount: HTMLElement,
  todayCount: HTMLElement,
): void {
  registerProjectsEvents(projectsList, homeCount, todayCount);
  registerTasksEvents(homeCount, todayCount);
  registerViewChangedEvents(sidebar);
}

/**
 * Subscribes to events for adding and deleting projects.
 * Updates the DOM list of projects and the global counters.
 * @param projectsList - The container that holds the project items.
 * @param homeCount - The badge element for the total number of tasks.
 * @param todayCount - The badge element for today's tasks.
 */
function registerProjectsEvents(projectsList: HTMLElement, homeCount: HTMLElement, todayCount: HTMLElement): void {
  subscribe(EVENTS.PROJECT_ADDED, project => {
    projectsList.appendChild(createProjectItem(project, { view: 'PROJECT', projectId: project.id }));
    updateCounters(homeCount, todayCount);
  });
  subscribe(EVENTS.PROJECT_DELETED, project => {
    const element = projectsList.querySelector(`[data-id="${project.id}"]`);
    element?.remove();
    updateCounters(homeCount, todayCount);
  });
}

/**
 * Reacts to task changes (add, delete, complete),
 * to keep the numeric counters in the sidebar up to date.
 * @param homeCount - The badge element for the total number of tasks.
 * @param todayCount - The badge element for today's tasks.
 */
function registerTasksEvents(homeCount: HTMLElement, todayCount: HTMLElement): void {
  const updateCounts = () => updateCounters(homeCount, todayCount);

  subscribe(EVENTS.TASK_TOGGLED, updateCounts);
  subscribe(EVENTS.TASK_ADDED, updateCounts);
  subscribe(EVENTS.TASK_DELETED, updateCounts);
}

/**
 * Manages the visual highlighting in the sidebar.
 * When switching views, the 'active' class is moved to the corresponding navigation item.
 */
function registerViewChangedEvents(sidebar: HTMLElement): void {
  subscribe(EVENTS.VIEW_CHANGED, view => {
    const activeElements = sidebar.querySelectorAll('.active');
    activeElements.forEach(element => element.classList.remove('active'));

    let selector = '';
    switch (view.view) {
      case 'HOME':
        selector = `[data-view="HOME"]`;
        break;
      case 'TODAY':
        selector = `[data-view="TODAY"]`;
        break;
      case 'PROJECT':
        selector = `[data-view="PROJECT"][data-id="${view.projectId}"]`;
        break;
    }

    const newActiveElement = sidebar.querySelector(selector);
    newActiveElement?.classList.add('active');
  });
}
// #endregion event-subscribtions

// #region create functions
function createNavItem(name: string, countElement: HTMLElement, counts: number, view: ViewChanged): HTMLElement {
  const navItem = document.createElement('div');
  navItem.classList.add('nav-item');

  navItem.dataset.view = view.view;

  const btn = document.createElement('button');
  btn.textContent = name;

  btn.addEventListener('click', () => {
    changeView(view);
  });

  countElement.textContent = String(counts);

  navItem.appendChild(btn);
  navItem.appendChild(countElement);

  return navItem;
}

function createProjectList(listElement: HTMLElement, projects: Project[]): HTMLElement {
  listElement.classList.add('projects-list');

  const title = document.createElement('h3');
  title.textContent = 'Projects';

  listElement.appendChild(title);

  projects.forEach(p => {
    listElement.appendChild(createProjectItem(p, { view: 'PROJECT', projectId: p.id }));
  });

  return listElement;
}

function createProjectItem(p: Project, view: ViewChanged): HTMLElement {
  const project = document.createElement('div');
  project.dataset.id = p.id;

  const btn = document.createElement('button');
  btn.dataset.view = view.view;
  btn.dataset.id = p.id;
  btn.textContent = p.name;

  btn.addEventListener('click', () => {
    changeView(view);
  });

  const count = document.createElement('span');
  count.textContent = String(p.totalCount);

  project.appendChild(btn);
  project.appendChild(count);

  return project;
}

function createAddButton(): HTMLElement {
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-item');
  const addBtn = document.createElement('button');
  addBtn.textContent = '+';

  btnContainer.appendChild(addBtn);
  return btnContainer;
}
// #endregion create functions

// #region count functions
function getTotalCount(): number {
  return getProjects().reduce((sum, project) => sum + project.totalCount, 0);
}

function getTodayCount(): number {
  const today = Temporal.Now.plainDateISO();
  return getProjects().reduce((sum, project) => {
    const todayTasks = project.todos.filter(todo => todo.dueDate.equals(today)).length;
    return sum + todayTasks;
  }, 0);
}

function updateCounters(homeCount: HTMLElement, todayCount: HTMLElement): void {
  homeCount.textContent = getTotalCount().toString();
  todayCount.textContent = getTodayCount().toString();
}
// #endregion count functions
