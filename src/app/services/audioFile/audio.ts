import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {
  private mediaRecorder!: MediaRecorder;
  private audioBlobSubject = new Subject<Blob>();
  private audioChunks: BlobPart[] = [];

  constructor() {}

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioBlobSubject.next(audioBlob);
          this.audioChunks = [];
        };
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        throw error;
      });
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject('Recording not started');
        return;
      }

      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());

      const subscription = this.audioBlobSubject.subscribe({
        next: (blob) => {
          resolve(blob);
          subscription.unsubscribe();
        },
        error: (err) => {
          reject(err);
          subscription.unsubscribe();
        }
      });
    });
  }
}