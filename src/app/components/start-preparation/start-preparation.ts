import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Pdf } from '../../services/PDF/pdf';

@Component({
  selector: 'app-start-preparation',
  imports: [],
  templateUrl: './start-preparation.html',
  styleUrl: './start-preparation.scss'
})
export class StartPreparation {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  triggerFileSelect(): void {
    this.fileInput.nativeElement.click(); // Opens file menu
  }

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      console.log('Selected file:', file.name);
      

    }
  }
}
