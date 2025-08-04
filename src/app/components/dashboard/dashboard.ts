import { Component, inject } from '@angular/core';
import { LeftBar } from "../left-bar/left-bar";
import { Hero } from "../hero/hero";
import { NgIf } from '@angular/common';
import { Speak } from '../../services/speak/speak';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [LeftBar, Hero,NgIf,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  sidebarVisible: boolean = false;

  private speakService=inject(Speak);

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSpeakClick=()=>{
    this.speakService.speak('Tell me about a time when you faced a challenge while learning or building something using Angular. How did you handle it?')
  }
 



}
