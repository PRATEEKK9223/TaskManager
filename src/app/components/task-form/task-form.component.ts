import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {

  @Input() task: any;
  @Input() isEditMode: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [''],
      title: [''],
      project: [''],
      date: ['']
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  submit() {
    const formValue = this.taskForm.value;
    console.log("Form Value:", formValue);   // 👈 DEBUG

    this.save.emit(formValue);
  }
  closeForm() {
    this.close.emit();
  }

}