import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-start-interview-popup',
  imports: [FormsModule],
  templateUrl: './start-interview-popup.html',
  styleUrl: './start-interview-popup.scss'
})
export class StartInterviewPopup {

  private userService = inject(User);

  level: string = '';
  time: string = '';

  onSubmit() {
    this.userService.startInterview(this.level, this.time)
  }

}
