import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-left-bar',
  imports: [RouterLink, RouterLinkActive,NgIf ],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.scss'
})
export class LeftBar {

  userName: string = "";
  showLogout = false;


  private authService = inject(Auth);


  ngOnInit() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userName = user.name;
    }
  }

  onLogoutClick = () => {
    this.authService.logout();
  }

}
