import { inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class Speak {
  private voices: SpeechSynthesisVoice[] = [];

  private finalTranscript = '';

  recognition: any;
  private listeningSubject = new BehaviorSubject<boolean>(false);
  isListening$ = this.listeningSubject.asObservable();  // Expose as observable

  private speakingSubject=new BehaviorSubject<boolean>(false);
  isSpeaking$=this.speakingSubject.asObservable();

  private userService=inject(User);

  constructor(private zone: NgZone) {
    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
    };
    const { webkitSpeechRecognition }: any = window as any;
    this.recognition = new webkitSpeechRecognition();  // Chrome only
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.voices = speechSynthesis.getVoices(); // Load immediately if available
  }

  speak(message: string, lang: string = 'en-US') {
  // Cancel any ongoing speech first
  speechSynthesis.cancel();
  
  this.zone.run(() => {
    this.speakingSubject.next(true);
  });

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = lang;
  utterance.pitch = 1;
  utterance.rate = 1;

  const preferredVoices = [
    'Google US English',
    'Microsoft Aria Online (Natural)',
    'Microsoft Heera - English (India)',
    'Google UK English Male'
  ];

  const selectedVoice = this.voices.find(v => preferredVoices.includes(v.name));
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onend = () => {
    this.zone.run(() => {
      this.speakingSubject.next(false);
    });
  };

  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    this.zone.run(() => {
      this.speakingSubject.next(false);
    });
  };

  speechSynthesis.speak(utterance);
}


  start(callback: (text: string) => void) {
    if (this.listeningSubject.value) return;

    this.listeningSubject.next(true);
    this.finalTranscript = '';

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          this.finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event);
      };

      this.recognition.onend = () => {
        this.listeningSubject.next(false);

        // ✅ When recognition stops, log final result
        console.log('Final transcript:', this.finalTranscript);
        this.userService.addAnswer(this.finalTranscript);
        
      };

      this.recognition.start();
    }

    stop() {
      if (!this.listeningSubject.value) return;
      this.recognition.stop();
      this.listeningSubject.next(false);
    }

    getAvailableVoices(): SpeechSynthesisVoice[] {
      return this.voices;
    }
  }