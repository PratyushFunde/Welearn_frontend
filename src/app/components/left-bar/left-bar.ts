import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.scss'
})
export class LeftBar {

  userName: string = "";

 

  ngOnInit() {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userName = user.name;
    }
  }
}
