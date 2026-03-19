import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } 
from '@angular/cdk/drag-drop';
import { ViewChildren, QueryList } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

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

  // saveTask(task: any) {
  //   task.id = Date.now();
  //   this.columns[this.selectedColumnIndex].tasks.push(task);
  //   this.saveToLocalStorage(); 
  //   this.showTaskForm = false;
  // }

  saveTask(task: any) {

  const columnIndex = this.columns.findIndex(
    col => col.title === task.status
  );

  if (columnIndex === -1) return;

  if (this.isEditMode) {

    // Remove from old column
    this.columns.forEach(col => {
      col.tasks = col.tasks.filter((t: any) => t.id !== task.id);
    });

    // Add to new column
    this.columns[columnIndex].tasks.push(task);

  } else {

    task.id = Date.now();
    this.columns[columnIndex].tasks.push(task);

  }

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

// Drag and Drop Logic
@ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
get connectedDropLists(): CdkDropList[] {
  return this.dropLists ? this.dropLists.toArray() : [];
}

drop(event: CdkDragDrop<any[]>) {

  if (event.previousContainer === event.container) {

    // Same column reorder
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

  } else {

    // Move between columns
    const movedTask = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // 🔥 UPDATE STATUS BASED ON TARGET COLUMN
    const targetColumn = this.columns.find(
      col => col.tasks === event.container.data
    );

    if (targetColumn) {
      movedTask.status = targetColumn.title;
    }

  }

  this.saveToLocalStorage();
}

}