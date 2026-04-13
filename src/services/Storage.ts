import { Project } from '../core/Project';

export const saveToStorage = (data: Project[]): void => {
  localStorage.setItem('projects', JSON.stringify(data));
};

export const loadFromStorage = (): Project[] => {
  const raw = localStorage.getItem('projects');
  if (!raw) {
    return [];
  }

  const data = JSON.parse(raw);
  return data.map(Project.fromJSON);
};
