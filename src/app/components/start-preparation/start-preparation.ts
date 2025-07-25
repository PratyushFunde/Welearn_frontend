import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Pdf } from '../../services/PDF/pdf.service';
import { Spinner } from "../spinner/spinner";
import { NgIf } from '@angular/common';
import { Profile } from '../../interface/profile.interface';

@Component({
  selector: 'app-start-preparation',
  imports: [Spinner,NgIf],
  templateUrl: './start-preparation.html',
  styleUrl: './start-preparation.scss'
})
export class StartPreparation {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isLoading:boolean=false;
  
  profile:Profile|null=null;

  private pdfService=inject(Pdf);

  ngOnInit(){
    this.pdfService.isPdfLoading$.subscribe((value)=>{
      this.isLoading=value;
    })

    this.pdfService.profile$.subscribe((value)=>{
      this.profile=value;
    })
   
  }

  triggerFileSelect(): void {
    this.fileInput.nativeElement.click(); // Opens file menu
  }

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      console.log('Selected file:', file.name);
      this.pdfService.uploadPDF(file);

    }
    input.value='';
  }
}
