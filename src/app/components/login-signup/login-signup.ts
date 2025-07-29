
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginSignupService } from '../../services/login-signup-service';
import { VerifyOtp } from "../verify-otp/verify-otp";
import { NgIf } from '@angular/common';
import { Spinner } from "../spinner/spinner";
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login-signup',
  imports: [ReactiveFormsModule, FormsModule, FontAwesomeModule, RouterLink, VerifyOtp, NgIf, Spinner],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.scss'
})
export class LoginSignup implements OnInit, OnDestroy {
  isLogin: boolean = true;
  showOTP: boolean = false;
  loginLoading: boolean = false;

  private router = inject(Router);
  loginSignupService = inject(LoginSignupService);
  private destroy$ = new Subject<void>();

  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');


  ngOnInit() {
    this.loginSignupService.showOtp$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.showOTP = value;
      });

    this.loginSignupService.loginLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.loginLoading = value;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  modeSwitch() {
    this.isLogin = !this.isLogin;
  }

  onFormSubmit() {
    // console.log(this.username.value, this.email.value, this.password.value);
    // console.log(this.isLogin);

    if (this.email.value == '' || this.password.value == '') {
      alert('Email or password cannot be empty');
      return;
    }

    if (!this.email.value || !this.isValidEmail(this.email.value)) {
      alert('Enter valid email !')
    }

    if (this.isLogin && this.email.value && this.password.value) {

      this.loginSignupService.onLogin(this.email.value, this.password.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            sessionStorage.setItem('token', res.token);

            sessionStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/dashboard']);
          },

          error: (error) => {
            console.error('Login error:', error);
            alert("Enter correct email and password !")
          }

        });


    }

    if (!this.isLogin && this.password && this.email && this.username) {
      if (this.password?.value && this.password.value?.length < 6) {
        alert('Password must be longer than or equal to 6 characters');
        return;
      }
      let userData =
      {
        name: this.username.value || '',
        email: this.email.value || '',
        password: this.password.value || ''
      }

      this.loginSignupService.onSignup(userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log("Signup Successful !");
            this.loginSignupService.setShowOtp(true);
            this.loginSignupService.userEmail = userData.email;
          },
          error: (err) => {
            console.log("Some error occured !")
            if (err.status === 400) {
              alert('Bad request: Please check your input fields.');
            }
            else if (err.status === 409) {
              alert('User already exists !')
            }
            else if (err.status === 500) {
              alert('Server error. Please try again later.');
            }
            else {
              alert('An unknown error occurred!');
            }
          }
        });

    }

    
  }


  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
