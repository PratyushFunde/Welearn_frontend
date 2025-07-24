import { Component } from '@angular/core';
import { LeftBar } from "../left-bar/left-bar";
import { Hero } from "../hero/hero";

@Component({
  selector: 'app-dashboard',
  imports: [LeftBar, Hero],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
