import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interview-screen',
  standalone: true,
  imports: [NgIf],
  templateUrl: './interview-screen.html',
  styleUrl: './interview-screen.scss'
})
export class InterviewScreen {

  @ViewChild('main', { static: true }) mainContainer!: ElementRef;

  isFullscreen = false;

  ngOnInit() {
    this.isFullscreen = !!document.fullscreenElement;

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
  }

}
