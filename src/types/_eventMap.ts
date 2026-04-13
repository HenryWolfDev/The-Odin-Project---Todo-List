import type { Project } from '../core/Project';
import type { Task } from '../core/Task';
import type { ViewChanged } from './_view';

export interface EventMap {
  'task-toggled': Task;
  'task-edited': Task;
  'task-added': Task;
  'task-deleted': Task;
  'project-added': Project;
  'project-deleted': Project;
  'view-changed': ViewChanged;
}

export const EVENTS = {
  TASK_TOGGLED: 'task-toggled',
  TASK_EDITED: 'task-edited',
  TASK_ADDED: 'task-added',
  TASK_DELETED: 'task-deleted',
  PROJECT_ADDED: 'project-added',
  PROJECT_DELETED: 'project-deleted',
  VIEW_CHANGED: 'view-changed',
} as const;
