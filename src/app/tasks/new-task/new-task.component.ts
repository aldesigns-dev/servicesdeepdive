import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // Todo: Voeg een contructor toe aan de component om de TasksService te initialiseren en beschikbaar te maken.

  // // 1: Handmatige initialisatie:
  // private tasksService: TasksService;
  // constructor() {
  //   this.tasksService = new TasksService();
  // }

  // 1: Dependency Injection. 
  constructor(private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    // 2: Voeg de addTask methode toe.
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
