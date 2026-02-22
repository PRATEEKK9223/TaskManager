import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  

  @Input() task: any;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

}
