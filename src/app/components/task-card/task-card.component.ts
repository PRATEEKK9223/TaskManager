import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() title!: string;
  @Input() project!: string;
  @Input() date!: string;

}
