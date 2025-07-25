import { Component } from '@angular/core';
import { StartPreparation } from "../start-preparation/start-preparation";
import { InterviewSkills } from "../interview-skills/interview-skills";

@Component({
  selector: 'app-practice',
  imports: [StartPreparation, InterviewSkills],
  templateUrl: './practice.html',
  styleUrl: './practice.scss'
})
export class Practice {

  

}
