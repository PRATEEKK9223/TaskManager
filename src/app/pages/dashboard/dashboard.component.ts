import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  columnForm!: FormGroup;
  private STORAGE_KEY = 'kanban-data';

  constructor(private fb: FormBuilder) {
  this.columnForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]]
  });
  this.loadFromLocalStorage();
}

  showTaskForm = false;
  showColumnForm = false;
  isEditMode = false;

  selectedTask: any = null;
  selectedColumnIndex!: number;

  columns: any[] = [
    {
      title: 'NEW TASK',
      tasks: []
    },
    {
      title: 'IN PROGRESS',
      tasks: []
    },
    {
      title: 'COMPLETED',
      tasks: []
    }
  ];

  // -------- TASK LOGIC --------

  openTaskForm(columnIndex: number) {
    this.selectedColumnIndex = columnIndex;
    this.isEditMode = false;
    this.selectedTask = null;
    this.showTaskForm = true;
  }

  saveTask(task: any) {
    task.id = Date.now();
    this.columns[this.selectedColumnIndex].tasks.push(task);
    this.saveToLocalStorage(); 
    this.showTaskForm = false;
  }

  deleteTask(columnIndex: number, taskId: number) {
    const confirmDelete = confirm("Are you sure?");
    if (confirmDelete) {
      this.columns[columnIndex].tasks =
        this.columns[columnIndex].tasks.filter((t: any) => t.id !== taskId);
    }
    this.saveToLocalStorage(); 
  }

  editTask(columnIndex: number, task: any) {
    this.selectedColumnIndex = columnIndex;
    this.selectedTask = { ...task };
    this.isEditMode = true;
    this.showTaskForm = true;
    this.saveToLocalStorage(); 
  }

  // -------- COLUMN LOGIC --------

  openColumnForm() {
    this.showColumnForm = true;
  }



saveColumn() {

  if (this.columnForm.invalid) {
    this.columnForm.markAllAsTouched();
    return;
  }

  let columnTitle = this.columnForm.value.title.trim();

  // 🔥 CHECK FOR DUPLICATE (case insensitive)
  const exists = this.columns.some(
    column => column.title.toLowerCase() === columnTitle.toLowerCase()
  );

  if (exists) {
    this.columnForm.get('title')?.setErrors({ duplicate: true });
    return;
  }

  this.columns.push({
    title: columnTitle,
    tasks: []
  });
  this.saveToLocalStorage();

  this.columnForm.reset();
  this.showColumnForm = false;
}

// Local storage method

loadFromLocalStorage() {

  const data = localStorage.getItem(this.STORAGE_KEY);

  if (data) {
    this.columns = JSON.parse(data);
  }

}

saveToLocalStorage() {
  localStorage.setItem(
    this.STORAGE_KEY,
    JSON.stringify(this.columns)
  );
}

}