import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() title!: string;
  @Input() showAdd: boolean = false;
  @Output() addTask = new EventEmitter<void>();

  @Output() deleteColumn = new EventEmitter<void>();

  onDeleteColumn() {
    this.deleteColumn.emit();
  }

  openForm() {
    this.addTask.emit();
  }
}


