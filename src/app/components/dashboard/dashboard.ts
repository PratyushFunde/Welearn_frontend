import { Component } from '@angular/core';
import { LeftBar } from "../left-bar/left-bar";
import { Hero } from "../hero/hero";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [LeftBar, Hero,NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  sidebarVisible: boolean = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
