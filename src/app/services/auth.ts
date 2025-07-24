import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token')
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout() {
    console.log("Token removed")
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

}
