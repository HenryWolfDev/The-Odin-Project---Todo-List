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
