import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user/user';
import { Utility } from '../../services/utility/utility';
import { createQuestionResponse } from '../../interface/profile.interface';
import { Router } from '@angular/router';
import { Speak } from '../../services/speak/speak';

@Component({
  selector: 'app-start-interview-popup',
  imports: [FormsModule],
  templateUrl: './start-interview-popup.html',
  styleUrl: './start-interview-popup.scss'
})
export class StartInterviewPopup {

  private userService = inject(User);
  private utility = inject(Utility);
  private speakService = inject(Speak);

  private router = inject(Router);
  question: string = ''

  level: string = '';
  time: string = '';

  onSubmit() {
    this.userService.level=this.level;
    (
      this.userService.startInterview(this.level, this.time)).subscribe({
        next: (res) => {
          console.log(res)
          const parsedQuestion = this.utility.parseQuestionToJSON(String(res)) as createQuestionResponse
          console.log(parsedQuestion);
          console.log(typeof (parsedQuestion));
          console.log(typeof (res));

          if (parsedQuestion) {

            this.question = parsedQuestion.question;
            this.router.navigate(['/dashboard/interview']);
            this.userService.addQuestion(parsedQuestion.question);
            this.speakService.speak(parsedQuestion.question);
          }
          else {
            alert("Some error occured !")
          }
          console.log(this.question)
        },
        error: (err: any) => { console.log(err) }
      })
  }

}
