import type { IProject } from '../types/_project';
import type { Task } from './Task';

export class Project implements IProject {
  id: string = crypto.randomUUID();
  name: string;
  todos: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
