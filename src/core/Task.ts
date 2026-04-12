import { Temporal } from 'temporal-polyfill';
import type { ITask, PriorityLevel } from '../types/_task';

export class Task implements ITask {
  id: string = crypto.randomUUID();
  title: string;
  description?: string | undefined;
  dueDate: Temporal.PlainDate = Temporal.Now.plainDateTimeISO().toPlainDate();
  priority: PriorityLevel = 4;
  isDone: boolean = false;

  constructor(title: string) {
    this.title = title;
  }

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }

  updateDescription(newDescr: string): void {
    this.description = newDescr;
  }

  updateDate(newDate: Temporal.PlainDate): void {
    this.dueDate = newDate;
  }

  toggleIsDone(): void {
    this.isDone = !this.isDone;
  }

  setPriority(newPrio: PriorityLevel): void {
    this.priority = newPrio;
  }
}
