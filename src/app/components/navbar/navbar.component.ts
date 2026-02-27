import { Component ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Output() addColumn = new EventEmitter<void>();

  openColumnForm() {
    this.addColumn.emit();
  }

}
