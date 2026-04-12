import { Temporal } from 'temporal-polyfill';
export type PriorityLevel = 1 | 2 | 3 | 4;

export interface ITask {
  id: string;
  title: string;
  description?: string | undefined;
  dueDate: Temporal.PlainDate | undefined;
  priority: PriorityLevel;
  isDone: boolean;
}
