// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//     showForm = false;

//   newTasks: any[] = [];

//   openForm() {
//     this.showForm = true;
//   }

//   closeForm() {
//     this.showForm = false;
//   }

//   saveTask(task: any) {
//     this.newTasks.push(task);
//     this.showForm = false;
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showForm = false;
  isEditMode = false;

  tasks: any[] = [];
  selectedTask: any = null;

  openForm() {
    this.isEditMode = false;
    this.selectedTask = null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveTask(task: any) {

    if (this.isEditMode) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    } else {
      task.id = Date.now();
      this.tasks.push(task);
    }

    this.showForm = false;
  }

  editTask(task: any) {
    this.isEditMode = true;
    this.selectedTask = { ...task };
    this.showForm = true;
  }

  deleteTask(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }

}
