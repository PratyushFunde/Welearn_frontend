import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Speak {
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
    };

    this.voices = speechSynthesis.getVoices(); // Load immediately if available
  }

  speak(message: string, lang: string = 'en-US') {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = lang;
    utterance.pitch = 0.6;
    utterance.rate = 1.1;

    const preferredVoices = [
      'Microsoft Heera - English (India)',
    ];

    // Try to pick the first matching voice
    const selectedVoice = this.voices.find(v => preferredVoices.includes(v.name));

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else { 
      console.warn('Preferred female voice not found. Using default voice.');
    }

    speechSynthesis.speak(utterance);
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}
