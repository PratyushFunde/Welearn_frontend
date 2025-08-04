import { environment } from './../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { createQuestionResponse, Profile } from '../../interface/profile.interface';
import { Pdf } from '../PDF/pdf.service';
import { interviewdata } from '../../models/interviewData';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Utility } from '../utility/utility';
import { Speak } from '../speak/speak';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class User {

  private http = inject(HttpClient);

  private router = inject(Router);

  profile: Profile | null = null;

  private pdfService = inject(Pdf);
  private utility = inject(Utility);

  level: string = ''

  data: interviewdata[] = [];

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

    return this.http.post<createQuestionResponse>(`${environment.apiUrl}/user/createQuestion`, { data: userData });

  }


  createQuestion = () => {
    const latestEntry = this.data.length > 0 ? this.data[this.data.length - 1] : null;
    const latestAnswer = latestEntry?.answer || " ";
    const payload = { skills: this.profile?.skills, experience: this.profile?.experiences, level: this.level, answer: latestAnswer }
    return this.http.post(`${environment.apiUrl}/user/createQuestion`, { data: payload })

  }


  addQuestion = (question: string) => {
    this.data.push({ question })
    console.log(this.data);
  }

  addAnswer(answerText: string) {
    const lastIndex = this.data.length - 1;
    if (lastIndex >= 0) {
      this.data[lastIndex].answer = answerText;
    }
    console.log(this.data)

  }


  endInterview = () => {
    alert('Interview ended !')
  }

  // Audio format transcribe test only 

  sendAudioToBackend(audioBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    // Adjust the endpoint as needed
    return this.http.post(`${environment.apiUrl}/audio/transcribeAudio`, formData);
  }

}
