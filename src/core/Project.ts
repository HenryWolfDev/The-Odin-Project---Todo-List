import type { IProject } from '../types/_project';
import type { Task } from './Task';

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
}
