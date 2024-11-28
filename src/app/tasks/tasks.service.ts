import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({ providedIn: 'root' })

export class TasksService {
  // 1:
  // tasks property met als initiële waarde een lege array ([]). 
  // Het type waarde van de signal is een array van 'Task'-objecten (<Task[]>).
  private tasks = signal<Task[]>([]);

  // Inject een service in een service
  private loggingService = inject(LoggingService);

  // 3:
  // Deze allTasks property biedt een readonly-versie van de tasks signal en zorgt ervoor dat de array niet rechtstreeks bewerkt wordt vanuit bijv. tasks-list.component.
  allTasks = this.tasks.asReadonly();

  // 2:
  // De addTask methode accepteert een object (taskData) afkomstig van de onAddTask-methode.
  addTask(taskData: { title: string; description: string}) { 
    // 2.2: Maak een newTask-object (met type Task voor typecontrole) door taskData uit te breiden met een unieke id en een status property.
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    };
    // 2.1: Werk de tasks signal bij door de oude array (oldTasks) te kopiëren met de spread-operator, het newTask-object toe te voegen en de bijgewerkte array terug te geven.
    this.tasks.update((oldTasks) => [...oldTasks, newTask])
    this.loggingService.log('ADDED TASK: ' + taskData.title);
  }

  // 4:
  // Vervangt de huidige tasks array met een nieuwe array, waarin de status met het opgegeven taskId wordt bijgewerkt naar newStatus.
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => 
      oldTasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    this.loggingService.log('CHANGED TASKSTATUS: ' + newStatus);
  }
}