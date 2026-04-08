import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    const success = this.auth.login(email!, password!);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = "Invalid credentials";
    }
  }
}