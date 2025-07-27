import { Component } from '@angular/core';
import { StartPreparation } from "../start-preparation/start-preparation";
import { InterviewSkills } from "../interview-skills/interview-skills";
import { StartInterviewPopup } from "../start-interview-popup/start-interview-popup";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-practice',
  imports: [StartPreparation, InterviewSkills, StartInterviewPopup, NgIf],
  templateUrl: './practice.html',
  styleUrl: './practice.scss'
})
export class Practice {

  showPopup: boolean = false;

  onStartInterviewClick = (msg: boolean) => {
    this.showPopup = msg;
  }

}
