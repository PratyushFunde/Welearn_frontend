import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Pdf } from '../../services/PDF/pdf.service';
import { Profile } from '../../interface/profile.interface';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-interview-skills',
  imports: [NgFor, FormsModule],
  templateUrl: './interview-skills.html',
  styleUrl: './interview-skills.scss'
})
export class InterviewSkills implements OnInit, OnDestroy {

  profile: Profile | null = null;
  newSkill: string = '';
  private destroy$ = new Subject<void>();

  private pdfService = inject(Pdf);

  ngOnInit() {
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

  removeSkill(skill: string) {
    if (this.profile?.skills) {

      const updatedSkills = this.profile.skills.filter(s => s !== skill);
      const updatedProfile = { ...this.profile, skills: updatedSkills }
      this.pdfService.setProfile(updatedProfile);
    }
  }

  addSkill() {
    if (this.profile?.skills) {
      const updatedSkills = [...this.profile.skills, this.newSkill];
      const updatedProfile = { ...this.profile, skills: updatedSkills };
      this.pdfService.setProfile(updatedProfile);
      this.newSkill = '';
    }
  }


}
