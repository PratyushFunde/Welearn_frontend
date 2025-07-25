import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Pdf } from '../../services/PDF/pdf.service';
import { Profile } from '../../interface/profile.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview-skills',
  imports: [NgFor,FormsModule],
  templateUrl: './interview-skills.html',
  styleUrl: './interview-skills.scss'
})
export class InterviewSkills {

  profile:Profile|null=null;
  newSkill:string='';


  private pdfService=inject(Pdf);

  ngOnInit(){
    this.pdfService.profile$.subscribe((value)=>{
      this.profile=value;
    })
  }

  removeSkill(skill:string){
    if(this.profile?.skills)
    {
      this.profile.skills=this.profile.skills.filter(s=>s!==skill);
    }
  }

  addSkill()
  {
    this.profile?.skills?.push(this.newSkill);
  }


}
