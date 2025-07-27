import { Component, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Pdf } from '../../services/PDF/pdf.service';
import { Spinner } from "../spinner/spinner";
import { NgIf } from '@angular/common';
import { Profile } from '../../interface/profile.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-start-preparation',
  imports: [Spinner, NgIf],
  templateUrl: './start-preparation.html',
  styleUrl: './start-preparation.scss'
})
export class StartPreparation implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() message = new EventEmitter<boolean>();

  isLoading: boolean = false;

  profile: Profile | null = null;
  private destroy$ = new Subject<void>();

  private pdfService = inject(Pdf);

  ngOnInit() {
    this.pdfService.isPdfLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isLoading = value;
      });

    this.pdfService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.profile = value;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
    input.value = '';
  }

  onStartClick() {
    this.message.emit(true);
  }

}
