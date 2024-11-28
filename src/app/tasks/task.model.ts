import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

// Herbruikbare Custom type-definitie voor de status Options.
type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done',
  taskStatus: TaskStatus,
  text: string
}[];

// Injection Token (All caps notation) waarmee status Options beschikbaar worden gemaakt in Angular's Dependency Injection.
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>('task-status-options');

// Definitie van de status Options.
export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed'
  }
];

// Custom Provider waarmee de TaskStatusOptions data beschikbaar wordt gemaakt in Angular's Dependency Injection.
export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions
}

// Interface voor een Task, die de structuur beschrijft.
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
