import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  private baseURL="http://localhost:8000/api/user"

  userEmail:string='';


  constructor(private http:HttpClient){}

  private showOtpSubject = new BehaviorSubject<boolean>(false);
  showOtp$ = this.showOtpSubject.asObservable();

  private verifyLoadingSubject = new BehaviorSubject<boolean>(false);
  verifyLoading$ = this.verifyLoadingSubject.asObservable();

  setShowOtp(value: boolean) {
    this.showOtpSubject.next(value);
  }
  
  setVerifyLoading(value:boolean){
    this.verifyLoadingSubject.next(value);
  }

  onLogin=(email:string,password:string)=>{

    const payload={email,password}
    return this.http.post(`${this.baseURL}/login`,payload);

  }
  
  onSignup=(userData:User)=>{
    console.log(userData);
    return this.http.post(`${this.baseURL}/createUser`,userData);

  }

  verifyOtp=(otp:string)=>
  {
    const payload={email:this.userEmail,otp:otp};
    return this.http.post(`${this.baseURL}/verifyOtp`,payload);
  }

}
