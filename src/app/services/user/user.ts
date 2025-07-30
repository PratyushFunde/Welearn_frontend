import { environment } from './../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../../interface/profile.interface';
import { Pdf } from '../PDF/pdf.service';
import { interviewdata } from '../../models/interviewData';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class User {

  private router=inject(Router);

  profile: Profile | null = null;

  private pdfService = inject(Pdf);

  data:interviewdata[]=[];

  constructor() {
    // Move subscription here directly, not in ngonInit
    th9is.pdfService.profile$.subscribe((value) => {
      this.profile = value;
    });
  }


  startInterview = (level: string, time: string) => {
    //Check if resume is parsed and skills is not empty
    // Call API to create questions
    // Store answers question wise

    const userData = { skills: this.profile?.skills, experience: this.profile?.experiences, level: level, time: time }

    this.createQuestion('',level);



  }


  createQuestion= async (answer:string|'',level:string)=>
  {
    const payload={ skills: this.profile?.skills, experience: this.profile?.experiences, level: level }

    const response=await fetch(`${environment.apiUrl}/user/createQuestion`,
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ data: payload,answer:answer })
      }
    )

    if(!response.ok)
    {
      console.log("Some error in creating question !")
    }

    const data=await response.json()
    console.log('Success:', data);
  }

  endInterview = () => {
    alert('Interview ended !')
  }
}
