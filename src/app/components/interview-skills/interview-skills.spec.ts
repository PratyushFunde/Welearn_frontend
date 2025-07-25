import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSkills } from './interview-skills';

describe('InterviewSkills', () => {
  let component: InterviewSkills;
  let fixture: ComponentFixture<InterviewSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
