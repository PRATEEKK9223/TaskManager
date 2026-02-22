import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [''],
      project: [''],
      date: ['']
    });
  }

  submit() {
    this.save.emit(this.taskForm.value);
    this.taskForm.reset();
  }

  closeForm() {
    this.close.emit();
  }
}