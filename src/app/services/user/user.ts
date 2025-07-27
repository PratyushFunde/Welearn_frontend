import { inject, Injectable } from '@angular/core';
import { Profile } from '../../interface/profile.interface';
import { Pdf } from '../PDF/pdf.service';

@Injectable({
  providedIn: 'root'
})
export class User {

  profile: Profile | null = null;

  private pdfService = inject(Pdf);

  constructor() {
    // Move subscription here directly, not in ngonInit
    this.pdfService.profile$.subscribe((value) => {
      this.profile = value;
    });
  }


  startInterview = (level: string, time: string) => {
    //Check if resume is parsed and skills is not empty
    // Call API to create questions
    // Store answers question wise 

    const userData = { skills: this.profile?.skills, experience: this.profile?.experiences, level: level, time: time }

    console.log(userData);

  }

  endInterview = () => {
    alert('Interview ended !')
  }
}
