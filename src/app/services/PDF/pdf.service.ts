import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import * as pdfjsLib from 'pdfjs-dist';
import { environment } from '../../../environments/environment';
import { Profile } from '../../interface/profile.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pdf {

  private http = inject(HttpClient);

  private isPdfResponseLoadingSubject=new BehaviorSubject<boolean>(false);
  public isPdfLoading$=this.isPdfResponseLoadingSubject.asObservable();
  // profile!: Profile;

  private profileSubject=new BehaviorSubject<Profile|null>(null)
  public profile$=this.profileSubject.asObservable();
  //Pdf extraction functions here
  //Also add Model call in this service


  uploadPDF = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    this.isPdfResponseLoadingSubject.next(true);
    this.http.post(`${environment.apiUrl}/user/analyzeResume`, formData).subscribe(
      {
        next: (res: any) => {
          console.log("Response from AI : ", res);
          try {
            const parsed: Profile = JSON.parse(res);
            this.profileSubject.next(parsed)
            console.log('Parsed Profile:', parsed);
            this.isPdfResponseLoadingSubject.next(false);
          }
          catch (err) {
            console.error('Failed to parse response:', err);
            this.isPdfResponseLoadingSubject.next(false);
          }
        },
        error: (err) => {
          if(err.status==429)
          {
            alert('Rate limit exceeded . Please wait few seconds and try again later !');
          }
          else{
            alert('Unexpected error occurred. Please try again later.');
          }
          console.error('Error uploading PDF:', err);
          this.isPdfResponseLoadingSubject.next(false);
        }
      },

    )

  }


}
