import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup-service';
import { Spinner } from "../spinner/spinner";

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule, Spinner],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss'
})
export class VerifyOtp implements OnInit {
  otp: string[] = ['', '', '', '', '', ''];
  loading: boolean = false;

  successMessage: string = "";
  errorMessage:string=""

  private loginSignupService = inject(LoginSignupService);

  ngOnInit(): void {
    this.loginSignupService.verifyLoading$.subscribe((value) => {
      this.loading = value;
    })
  }

  onSubmit() {
    const fullOtp = this.otp.join('');
    console.log('Entered OTP:', fullOtp);

    this.loginSignupService.setVerifyLoading(true);
    this.loginSignupService.verifyOtp(fullOtp).subscribe(
      {
        next: (res) => {
          console.log("Verified Successfully")
          this.loginSignupService.setVerifyLoading(false);
          this.successMessage = "OTP is verified Successfully , now you can Login ! "
        },
        error: (err) => {
          console.log("Error occured in verification", err)
          this.loginSignupService.setVerifyLoading(false);
          this.errorMessage = err.error?.message || 'OTP verification failed!';
        }
      }
    );


  }

  resendOtp() {
    console.log('Resending OTP...');

  }



}
