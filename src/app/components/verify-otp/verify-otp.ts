import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginSignupService } from '../../services/login-signup-service';
import { Spinner } from "../spinner/spinner";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule, Spinner],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss'
})
export class VerifyOtp implements OnInit, OnDestroy {
  otp: string[] = ['', '', '', '', '', ''];
  loading: boolean = false;

  successMessage: string = "";
  errorMessage:string=""
  private destroy$ = new Subject<void>();

  private loginSignupService = inject(LoginSignupService);

  ngOnInit(): void {
    this.loginSignupService.verifyLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    const fullOtp = this.otp.join('');
    console.log('Entered OTP:', fullOtp);

    this.loginSignupService.setVerifyLoading(true);
    this.loginSignupService.verifyOtp(fullOtp)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
      });


  }

  resendOtp() {
    console.log('Resending OTP...');

  }



}
