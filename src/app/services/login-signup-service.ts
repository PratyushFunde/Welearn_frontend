import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  private baseURL = `${environment.apiUrl}/user`

  userEmail: string = '';


  constructor(private http: HttpClient) { }

  private showOtpSubject = new BehaviorSubject<boolean>(false);
  showOtp$ = this.showOtpSubject.asObservable();

  private verifyLoadingSubject = new BehaviorSubject<boolean>(false);
  verifyLoading$ = this.verifyLoadingSubject.asObservable();

  private loginLoadingSubject = new BehaviorSubject<boolean>(false);
  loginLoading$ = this.loginLoadingSubject.asObservable();

  setShowOtp(value: boolean) {
    this.showOtpSubject.next(value);
  }

  setVerifyLoading(value: boolean) {
    this.verifyLoadingSubject.next(value);
  }


  setLoginLoading(value: boolean) {
    this.loginLoadingSubject.next(value);
  }

  onLogin = (email: string, password: string) => {

    const payload = { email, password }
    this.setLoginLoading(true);
    return this.http.post(`${this.baseURL}/login`, payload).pipe(
      finalize(()=>{
        this.setLoginLoading(false);
      })
    );

  }

  onSignup = (userData: User) => {
    console.log(userData);
    this.setLoginLoading(true);
    return this.http.post(`${this.baseURL}/createUser`, userData).pipe(
      finalize(()=>{
        this.setLoginLoading(false);
      })
    );

  }

  verifyOtp = (otp: string) => {
    const payload = { email: this.userEmail, otp: otp };
    return this.http.post(`${this.baseURL}/verifyOtp`, payload);
  }

}
