import type { Task } from '../core/Task';

export interface IProject {
  id: string;
  name: string;
  todos: Task[];
}
