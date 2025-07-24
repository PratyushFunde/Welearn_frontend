
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginSignupService } from '../../services/login-signup-service';
import { VerifyOtp } from "../verify-otp/verify-otp";


@Component({
  selector: 'app-login-signup',
  imports: [ReactiveFormsModule, FormsModule, FontAwesomeModule, RouterLink, VerifyOtp],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.scss'
})
export class LoginSignup implements OnInit {
  isLogin: boolean = true;
  showOTP:boolean=false;

  private router=inject(Router);
  loginSignupService = inject(LoginSignupService);

  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');


  ngOnInit(){
    this.loginSignupService.showOtp$.subscribe((value)=>{
      this.showOTP=value;
    })
  }

  modeSwitch() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit() {
    // console.log(this.username.value, this.email.value, this.password.value);
    // console.log(this.isLogin);

    if (this.isLogin && this.email.value && this.password.value) {

      this.loginSignupService.onLogin(this.email.value,this.password.value).subscribe({

        next:(res:any)=>{
          sessionStorage.setItem('token',res.token);

          sessionStorage.setItem('user',JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
        },

        error:(error)=>{
          console.error('Login error:', error);
          alert("Enter correct email and password !")
        }

      })


    }

    if (!this.isLogin) {
      let userData =
      {
        name: this.username.value || '',
        email: this.email.value || '',
        password: this.password.value || ''
      }

      this.loginSignupService.onSignup(userData).subscribe({
        next:(res)=>
          {
            console.log("Signup Successful !");
            this.loginSignupService.setShowOtp(true);
            this.loginSignupService.userEmail=userData.email;
          },
        error:(err)=>console.log("Some error occured !")
      });

    }
  }


}
