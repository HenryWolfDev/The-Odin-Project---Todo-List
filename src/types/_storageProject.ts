import type { IStorageTask } from './_storageTask';

export interface IStorageProject {
  id: string;
  name: string;
  todos: IStorageTask[];
}
