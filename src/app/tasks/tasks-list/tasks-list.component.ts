import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  // 3: Element injector
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');

  // Inject de TaskService en output de data. 
  private tasksService = inject(TasksService);
  // 1: tasks = this.tasksService.allTasks;
  
  // 4:
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  // 2:
  // De tasks signal wordt re-computed als de selectedFilter of tasks veranderen.
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
