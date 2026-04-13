import { subscribe } from '../services/EventBus';
import { changeView, getProjects } from '../services/AppState';
import { Project } from '../core/Project';
import { Temporal } from 'temporal-polyfill';
import type { ViewChanged } from '../types/_view';

export function createSidebar(): HTMLElement {
  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar');

  const projectsList = document.createElement('div');
  const homeCount = document.createElement('span');
  const todayCount = document.createElement('span');

  // Hilfsfunktionen aufrufen
  sidebar.appendChild(createNavItem('Home', homeCount, getTotalCount(), { view: 'HOME' }));
  sidebar.appendChild(createNavItem('Today', todayCount, getTodayCount(), { view: 'TODAY' }));
  sidebar.appendChild(createProjectList(projectsList, getProjects()));
  sidebar.appendChild(createAddButton());

  // Events subscriben
  subscribe('project-added', project => {
    projectsList.appendChild(createProjectItem(project, { view: 'PROJECT', projectId: project.id }));
    updateCounters(homeCount, todayCount);
  });
  subscribe('project-deleted', project => {
    const element = projectsList.querySelector(`[data-id="${project.id}"]`);
    element?.remove();
    updateCounters(homeCount, todayCount);
  });
  subscribe('task-toggled', () => {
    updateCounters(homeCount, todayCount);
  });
  subscribe('task-added', () => {
    updateCounters(homeCount, todayCount);
  });
  subscribe('task-deleted', () => {
    updateCounters(homeCount, todayCount);
  });
  subscribe('view-changed', view => {
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

  return sidebar;
}

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
