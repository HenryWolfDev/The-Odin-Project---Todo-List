import type { IProject } from '../types/_project';
import type { IStorageProject } from '../types/_storageProject';
import { Task } from './Task';

export class Project implements IProject {
  id: string = crypto.randomUUID();
  name: string;
  todos: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addTodo(task: Task): void {
    this.todos.push(task);
  }

  removeTodo(id: string): void {
    const taskIndex = this.todos.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.todos.splice(taskIndex, 1);
    }
  }

  get totalCount(): number {
    return this.todos.length;
  }

  get completedCount(): number {
    return this.todos.filter(tasks => tasks.isDone).length;
  }

  static fromJSON(data: IStorageProject): Project {
    const newProject = new Project(data.name);
    newProject.id = data.id;

    const tasks = data.todos.map(Task.fromJSON);
    newProject.todos = tasks;

    return newProject;
  }
}
