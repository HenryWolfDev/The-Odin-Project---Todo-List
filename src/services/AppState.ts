import type { Project } from '../core/Project';
import type { Task } from '../core/Task';
import type { ViewChanged } from '../types/_view';
import { publish } from './EventBus';
import { loadFromStorage, saveToStorage } from './Storage';

const projects: Project[] = loadFromStorage();
let currentView: ViewChanged = { view: 'HOME' };

// #region getter
export function getProjects(): Project[] {
  return projects;
}
export function getCurrentView(): ViewChanged {
  return currentView;
}
// #endregion getter

// #region task actions
export function toggleTask(task: Task): void {
  task.toggleIsDone();
  saveToStorage(projects);
  publish('task-toggled', task);
}
export function editTask(task: Task): void {
  saveToStorage(projects);
  publish('task-edited', task);
}
export function addTask(task: Task, projectId: string): void {
  const project = projects.find(project => project.id === projectId);
  if (!project) return;
  project?.addTodo(task);
  saveToStorage(projects);
  publish('task-added', task);
}
export function deleteTask(task: Task, projectId: string): void {
  const project = projects.find(project => project.id === projectId);
  if (!project) return;
  project.removeTodo(task.id);
  saveToStorage(projects);
  publish('task-deleted', task);
}
// #endregion task actions

// #region project actions
export function addProject(project: Project): void {
  projects.push(project);
  saveToStorage(projects);
  publish('project-added', project);
}
export function deleteProject(project: Project): void {
  const index = projects.findIndex(p => p.id === project.id);
  if (index === -1) return;
  projects.splice(index, 1);
  saveToStorage(projects);
  publish('project-deleted', project);
}
// #endregion project actions

export function changeView(view: ViewChanged): void {
  currentView = view;
  publish('view-changed', view);
}
