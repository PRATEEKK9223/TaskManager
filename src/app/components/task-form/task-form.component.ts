import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';

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
    title: ['', Validators.required],
    project: ['', Validators.required],
    date: ['', Validators.required]
  });
}

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

 submit() {

  if (this.taskForm.invalid) {
    this.taskForm.markAllAsTouched();   // shows errors
    return;
  }

  this.save.emit(this.taskForm.value);
}
  closeForm() {
    this.close.emit();
  }

}