import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Speak } from '../../services/speak/speak';
import { User } from '../../services/user/user';
import { Utility } from '../../services/utility/utility';
import { createQuestionResponse } from '../../interface/profile.interface';
import { AudioRecordingService } from '../../services/audioFile/audio';



@Component({
  selector: 'app-interview-screen',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './interview-screen.html',
  styleUrl: './interview-screen.scss'
})
export class InterviewScreen {

  @ViewChild('main', { static: true }) mainContainer!: ElementRef;

  transcript = '';

  private speakService = inject(Speak);
  private userService = inject(User);
  private utilityService = inject(Utility);

  isFullscreen = false;
  isListening = false;
  isAISpeaking: boolean = false;
  isInterviewDone: boolean = false;

  constructor() {
    this.speakService.isListening$.subscribe(state => {
      this.isListening = state;
    });


  }

  ngOnInit() {
    this.isFullscreen = !!document.fullscreenElement;
    this.speakService.isSpeaking$.subscribe((value) => {
      this.isAISpeaking = value;
    })

    this.userService.isInterviewDone$.subscribe((value) => {
      this.isInterviewDone = value;
    })

    // ❗ If you try this, it will still be blocked by browser if not user-initiated
    // this.enterFullscreen(); // Don't do this unless triggered by user gesture
  }

  enterFullscreen() {
    const elem = this.mainContainer.nativeElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen()
        .then(() => {
          this.isFullscreen = true;
        })
        .catch((err: any) => {
          console.error('Fullscreen failed:', err);
        });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
      });
    }
  }



  endInterview() {


    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => this.isFullscreen = false)
        .catch(err => console.error('Exit fullscreen failed:', err));
    }

    // TODO: Add any other logic like navigating away, showing a confirmation, etc.
    console.log('Interview ended!');

    this.userService.endInterview();
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
      this.stop()
    } else {
      this.startListening();
      this.start();
    }
  }

  startListening() {
    this.speakService.start(text => {
      this.transcript = text;
    });
  }

  stopListening() {
    this.speakService.stop();
    // console.log(this.transcript)
  }

  createNextQuestion = () => {

    // Check if interview is done
    if(this.userService.data.length>=2){
      this.isInterviewDone = true;
      return alert("Interview is done ! Please end the interview.")
    }
    if (this.isInterviewDone) {
      return alert("Please end the interview !")
    }
    else {
      this.userService.createQuestion().subscribe({
        next: (res) => {
          console.log("Created next question : ", res)
          const parsedQuestion = this.utilityService.parseQuestionToJSON(String(res)) as createQuestionResponse
          console.log(parsedQuestion);

          if (parsedQuestion) {
            this.userService.addQuestion(parsedQuestion.question);
            this.speakService.speak(parsedQuestion.question);
          }
          else {
            alert("Some error occured !")
          }
        },
        error: (err) => { console.log("Some error in creating question : ", err) }
      })
    }
  }


  // Audio Service code Test Only

  private audioRecordingService = inject(AudioRecordingService)

  start() {
    this.audioRecordingService.startRecording();
    this.speakService.start(text => {
      this.transcript = text;
    });
  }

  stop() {
    this.speakService.stop();
    this.audioRecordingService.stopRecording()
      .then((audioBlob: Blob) => {
        // Send the audio to backend
        this.userService.sendAudioToBackend(audioBlob).subscribe({
          next: (response) => {
            console.log('Audio sent successfully', response);
            this.userService.addAnswer(response);
            this.createNextQuestion();
          },
          error: (error) => {
            console.error('Error sending audio', error);
          }
        });
      })
      .catch((error) => {
        console.error('Error recording audio', error);
      });
  }

}
