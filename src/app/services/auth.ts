import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private router = inject(Router)

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token')
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout() {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
