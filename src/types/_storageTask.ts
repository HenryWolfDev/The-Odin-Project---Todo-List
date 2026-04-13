import type { PriorityLevel } from './_task';

export interface IStorageTask {
  id: string;
  title: string;
  description?: string | undefined;
  dueDate: string;
  priority: PriorityLevel;
  isDone: boolean;
}
