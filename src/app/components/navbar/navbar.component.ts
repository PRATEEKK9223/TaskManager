import { Component ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Output() addColumn = new EventEmitter<void>();
    

    constructor(private auth: AuthService, private router: Router) {}

    logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
    }

  openColumnForm() {
    this.addColumn.emit();
  }

}
