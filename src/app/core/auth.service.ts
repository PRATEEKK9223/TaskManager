import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_KEY = 'user';
  private CURRENT_USER = 'currentUser';

  signup(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const user = JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');

    if (user.email === email && user.password === password) {
      localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.CURRENT_USER);
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER);
  }
}