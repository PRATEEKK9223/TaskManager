import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    showForm = false;

  newTasks: any[] = [];

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveTask(task: any) {
    this.newTasks.push(task);
    this.showForm = false;
  }
}
