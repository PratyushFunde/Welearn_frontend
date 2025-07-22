
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-login-signup',
  imports: [ReactiveFormsModule, FormsModule, FontAwesomeModule,RouterLink],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.scss'
})
export class LoginSignup {
  isLogin: boolean = true;

  

  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  modeSwitch() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit() {
    console.log(this.username.value, this.email.value, this.password.value);
  }


}
